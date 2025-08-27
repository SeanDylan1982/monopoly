import { GameState } from './GameState.js';
import { UIManager } from '../ui/UIManager.js';
import { CardManager } from './CardManager.js';

export class GameLogic {
  constructor() {
    this.gameState = new GameState();
    this.uiManager = new UIManager(this);
    this.cardManager = new CardManager(this);
    this.initialize();
  }

  initialize() {
    this.uiManager.initializeBoard();
    this.uiManager.initializeEventListeners();
    this.uiManager.updateDisplay();
    this.startGame();
  }

  startGame() {
    this.gameState.gameStarted = true;
    this.uiManager.addMessage("Game started! Roll dice to begin.", "success");
    this.uiManager.addMessage(`${this.gameState.players[0].name}'s turn`, "info");
  }

  rollDice() {
    if (!this.gameState.canRoll) return;

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = dice1 === dice2;

    this.gameState.lastRoll = [dice1, dice2];
    this.uiManager.updateDiceDisplay(dice1, dice2);

    const total = dice1 + dice2;
    const currentPlayer = this.gameState.getCurrentPlayer();

    // Handle jail logic
    if (currentPlayer.inJail) {
      if (isDoubles) {
        currentPlayer.inJail = false;
        currentPlayer.jailTurns = 0;
        this.uiManager.addMessage(`${currentPlayer.name} rolled doubles and got out of jail!`, "success");
      } else {
        currentPlayer.jailTurns++;
        if (currentPlayer.jailTurns >= 3) {
          currentPlayer.money -= 50;
          currentPlayer.inJail = false;
          currentPlayer.jailTurns = 0;
          this.uiManager.addMessage(`${currentPlayer.name} paid $50 to get out of jail after 3 turns.`, "warning");
        } else {
          this.uiManager.addMessage(`${currentPlayer.name} is still in jail. Turn ${currentPlayer.jailTurns}/3`, "warning");
          this.endTurn();
          return;
        }
      }
    }

    // Handle doubles
    if (isDoubles && !currentPlayer.inJail) {
      currentPlayer.doublesCount++;
      if (currentPlayer.doublesCount >= 3) {
        this.sendToJail(currentPlayer);
        this.uiManager.addMessage(`${currentPlayer.name} rolled 3 doubles and went to jail!`, "warning");
        this.endTurn();
        return;
      } else {
        this.uiManager.addMessage(`${currentPlayer.name} rolled doubles! Roll again after your turn.`, "success");
      }
    } else {
      currentPlayer.doublesCount = 0;
    }

    // Move player
    this.movePlayer(currentPlayer, total);

    this.gameState.canRoll = isDoubles && !currentPlayer.inJail;
    this.uiManager.updateControlButtons();

    this.uiManager.addMessage(
      `${currentPlayer.name} rolled ${dice1} + ${dice2} = ${total}${isDoubles ? " (Doubles!)" : ""}`,
      "info"
    );
    this.uiManager.updateDisplay();
  }

  movePlayer(player, spaces) {
    const oldPosition = player.position;
    player.position = (player.position + spaces) % 40;

    // Check if passed GO
    if (oldPosition + spaces >= 40 || player.position < oldPosition) {
      player.money += 200;
      player.hasPassedGo = true;
      this.uiManager.addMessage(`${player.name} passed GO and collected $200!`, "success");
    }

    this.uiManager.renderPlayers();
    this.handleSquareLanding(player);
  }

  sendToJail(player) {
    player.position = 10; // Jail position
    player.inJail = true;
    player.jailTurns = 0;
    player.doublesCount = 0;
    this.uiManager.renderPlayers();
  }

  handleSquareLanding(player) {
    const property = this.gameState.getProperty(player.position);

    switch (property.type) {
      case "property":
      case "railroad":
      case "utility":
        if (!property.owner) {
          this.uiManager.enableBuyButton();
          this.uiManager.addMessage(`${property.name} is available for $${property.price}`, "info");
        } else if (property.owner !== this.gameState.currentPlayerIndex) {
          this.payRent(property);
        }
        break;
      case "tax":
        player.money -= property.rent;
        this.gameState.freeParkingPot += property.rent;
        this.uiManager.updateFreeParkingPotDisplay();
        this.uiManager.addMessage(`${player.name} paid $${property.rent} in taxes`, "warning");
        break;
      case "chest":
      case "chance":
        this.cardManager.drawCard(property.type);
        break;
      case "free-parking":
        if (this.gameState.freeParkingPot > 0) {
          player.money += this.gameState.freeParkingPot;
          this.uiManager.addMessage(
            `${player.name} landed on Free Parking and won $${this.gameState.freeParkingPot}!`,
            "success"
          );
          this.gameState.freeParkingPot = 0;
          this.uiManager.updateFreeParkingPotDisplay();
        } else {
          this.uiManager.addMessage(`${player.name} landed on Free Parking (no pot to collect).`, "info");
        }
        break;
      case "go-to-jail":
        this.sendToJail(player);
        this.uiManager.addMessage(`${player.name} went to jail!`, "warning");
        break;
    }
  }

  payRent(property) {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const owner = this.gameState.players[property.owner];
    let rent = this.calculateRent(property);

    if (property.mortgaged) {
      this.uiManager.addMessage(`${property.name} is mortgaged - no rent due.`, "info");
      return;
    }

    currentPlayer.money -= rent;
    owner.money += rent;

    this.uiManager.addMessage(`${currentPlayer.name} paid $${rent} rent to ${owner.name}`, "warning");
  }

  calculateRent(property) {
    if (property.type === "property") {
      let rent = property.rent;
      if (property.houses > 0) {
        rent = property.rent * Math.pow(2, property.houses);
      } else if (this.ownsColorGroup(property.owner, property.color)) {
        rent *= 2; // Double rent for owning color group
      }
      return rent;
    } else if (property.type === "railroad") {
      const railroadsOwned = this.countRailroadsOwned(property.owner);
      return property.rent * Math.pow(2, railroadsOwned - 1);
    } else if (property.type === "utility") {
      const utilitiesOwned = this.countUtilitiesOwned(property.owner);
      const multiplier = utilitiesOwned === 1 ? 4 : 10;
      return (this.gameState.lastRoll[0] + this.gameState.lastRoll[1]) * multiplier;
    }
    return property.rent;
  }

  ownsColorGroup(playerIndex, color) {
    const colorProperties = this.gameState.properties.filter(
      prop => prop.color === color && prop.type === "property"
    );
    return colorProperties.every(prop => prop.owner === playerIndex);
  }

  countRailroadsOwned(playerIndex) {
    return this.gameState.properties.filter(
      prop => prop.type === "railroad" && prop.owner === playerIndex
    ).length;
  }

  countUtilitiesOwned(playerIndex) {
    return this.gameState.properties.filter(
      prop => prop.type === "utility" && prop.owner === playerIndex
    ).length;
  }

  buyProperty() {
    const currentPlayer = this.gameState.getCurrentPlayer();
    const property = this.gameState.getProperty(currentPlayer.position);

    if (!currentPlayer.hasPassedGo) {
      this.uiManager.addMessage(`${currentPlayer.name} must pass GO before buying properties!`, "warning");
      return;
    }

    if (currentPlayer.money >= property.price) {
      currentPlayer.money -= property.price;
      property.owner = this.gameState.currentPlayerIndex;
      currentPlayer.properties.push(currentPlayer.position);

      this.uiManager.addMessage(`${currentPlayer.name} bought ${property.name} for $${property.price}`, "success");
      this.uiManager.disableBuyButton();
      this.uiManager.updateDisplay();
    } else {
      this.uiManager.addMessage(`${currentPlayer.name} doesn't have enough money!`, "warning");
    }
  }

  endTurn() {
    this.gameState.currentPlayerIndex = (this.gameState.currentPlayerIndex + 1) % this.gameState.players.length;
    this.gameState.canRoll = true;

    this.uiManager.updateControlButtons();
    this.uiManager.updateDisplay();
    this.uiManager.addMessage(`${this.gameState.getCurrentPlayer().name}'s turn`, "info");

    this.checkGameEnd();
  }

  checkGameEnd() {
    const activePlayers = this.gameState.players.filter(player => player.money > 0);
    if (activePlayers.length === 1) {
      this.uiManager.addMessage(`${activePlayers[0].name} wins the game!`, "success");
      this.uiManager.showGameEndModal(activePlayers[0]);
      return true;
    }
    return false;
  }

  newGame() {
    this.gameState.resetGame();
    this.uiManager.initializeBoard();
    this.uiManager.updateDisplay();
    this.uiManager.clearMessageLog();
    this.uiManager.resetDiceDisplay();
    this.startGame();
  }

  mortgageProperty(propertyIndex) {
    const property = this.gameState.getProperty(propertyIndex);
    const currentPlayer = this.gameState.getCurrentPlayer();

    if (property.owner === this.gameState.currentPlayerIndex && !property.mortgaged) {
      const mortgageValue = Math.floor(property.price / 2);
      currentPlayer.money += mortgageValue;
      property.mortgaged = true;
      this.uiManager.addMessage(
        `${currentPlayer.name} mortgaged ${property.name} for $${mortgageValue}`,
        "warning"
      );
      this.uiManager.updateDisplay();
    }
  }

  unmortgageProperty(propertyIndex) {
    const property = this.gameState.getProperty(propertyIndex);
    const currentPlayer = this.gameState.getCurrentPlayer();

    if (property.owner === this.gameState.currentPlayerIndex && property.mortgaged) {
      const unmortgageCost = Math.floor(property.price / 2 * 1.1); // 10% interest
      if (currentPlayer.money >= unmortgageCost) {
        currentPlayer.money -= unmortgageCost;
        property.mortgaged = false;
        this.uiManager.addMessage(
          `${currentPlayer.name} unmortgaged ${property.name} for $${unmortgageCost}`,
          "success"
        );
        this.uiManager.updateDisplay();
      }
    }
  }
}