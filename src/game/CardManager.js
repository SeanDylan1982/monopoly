export class CardManager {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
    this.chanceCards = this.initializeChanceCards();
    this.communityChestCards = this.initializeCommunityChestCards();
  }

  initializeChanceCards() {
    return [
      {
        text: "Advance to GO, collect $200",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          player.position = 0;
          player.money += 200;
          player.hasPassedGo = true;
          this.gameLogic.uiManager.renderPlayers();
        }
      },
      {
        text: "Go to Jail - Go directly to jail",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          this.gameLogic.sendToJail(player);
        }
      },
      {
        text: "Pay poor tax of $15",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          player.money -= 15;
          this.gameLogic.gameState.freeParkingPot += 15;
          this.gameLogic.uiManager.updateFreeParkingPotDisplay();
        }
      },
      {
        text: "Your building loan matures - collect $150",
        action: () => {
          this.gameLogic.gameState.getCurrentPlayer().money += 150;
        }
      },
      {
        text: "Advance to Illinois Ave",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          const illinoisPosition = 24;
          if (player.position > illinoisPosition) {
            player.money += 200; // Passed GO
            player.hasPassedGo = true;
          }
          player.position = illinoisPosition;
          this.gameLogic.uiManager.renderPlayers();
          this.gameLogic.handleSquareLanding(player);
        }
      }
    ];
  }

  initializeCommunityChestCards() {
    return [
      {
        text: "Bank error in your favor - collect $200",
        action: () => {
          this.gameLogic.gameState.getCurrentPlayer().money += 200;
        }
      },
      {
        text: "Doctor's fees - pay $50",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          player.money -= 50;
          this.gameLogic.gameState.freeParkingPot += 50;
          this.gameLogic.uiManager.updateFreeParkingPotDisplay();
        }
      },
      {
        text: "From sale of stock you get $50",
        action: () => {
          this.gameLogic.gameState.getCurrentPlayer().money += 50;
        }
      },
      {
        text: "Go to Jail - Go directly to jail",
        action: () => {
          const player = this.gameLogic.gameState.getCurrentPlayer();
          this.gameLogic.sendToJail(player);
        }
      },
      {
        text: "Holiday fund matures - receive $100",
        action: () => {
          this.gameLogic.gameState.getCurrentPlayer().money += 100;
        }
      }
    ];
  }

  drawCard(type) {
    const cards = type === "chance" ? this.chanceCards : this.communityChestCards;
    const card = cards[Math.floor(Math.random() * cards.length)];
    
    card.action();
    this.gameLogic.uiManager.showCardModal(card.text);
    this.gameLogic.uiManager.addMessage(`${type === "chance" ? "Chance" : "Community Chest"}: ${card.text}`, "info");
  }
}