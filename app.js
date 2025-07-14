class MonopolyGame {
  constructor() {
    this.players = [
      {
        id: 1,
        name: "Player 1",
        money: 1500,
        position: 0,
        properties: [],
        color: "#e74c3c",
        hasPassedGo: false,
      },
      {
        id: 2,
        name: "Player 2",
        money: 1500,
        position: 0,
        properties: [],
        color: "#3498db",
        hasPassedGo: false,
      },
      {
        id: 3,
        name: "Player 3",
        money: 1500,
        position: 0,
        properties: [],
        color: "#2ecc71",
        hasPassedGo: false,
      },
      {
        id: 4,
        name: "Player 4",
        money: 1500,
        position: 0,
        properties: [],
        color: "#f39c12",
        hasPassedGo: false,
      },
    ];

    this.currentPlayerIndex = 0;
    this.gameStarted = false;
    this.lastRoll = [0, 0];
    this.canRoll = true;
    this.freeParkingPot = 0;

    this.properties = this.initializeProperties();
    this.initializeBoard();
    this.initializeEventListeners();
    this.updateDisplay();
    this.startGame();
  }

  initializeProperties() {
    return [
      { name: "GO", type: "go", price: 0, rent: 0, color: "" },
      {
        name: "Mediterranean Ave",
        type: "property",
        price: 60,
        rent: 2,
        color: "brown",
        houses: 0,
        owner: null,
      },
      { name: "Community Chest", type: "chest", price: 0, rent: 0, color: "" },
      {
        name: "Baltic Ave",
        type: "property",
        price: 60,
        rent: 4,
        color: "brown",
        houses: 0,
        owner: null,
      },
      { name: "Income Tax", type: "tax", price: 0, rent: 200, color: "" },
      {
        name: "Reading Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
      },
      {
        name: "Oriental Ave",
        type: "property",
        price: 100,
        rent: 6,
        color: "light-blue",
        houses: 0,
        owner: null,
      },
      { name: "Chance", type: "chance", price: 0, rent: 0, color: "" },
      {
        name: "Vermont Ave",
        type: "property",
        price: 100,
        rent: 6,
        color: "light-blue",
        houses: 0,
        owner: null,
      },
      {
        name: "Connecticut Ave",
        type: "property",
        price: 120,
        rent: 8,
        color: "light-blue",
        houses: 0,
        owner: null,
      },
      { name: "Jail", type: "jail", price: 0, rent: 0, color: "" },
      {
        name: "St. Charles Place",
        type: "property",
        price: 140,
        rent: 10,
        color: "pink",
        houses: 0,
        owner: null,
      },
      {
        name: "Electric Company",
        type: "utility",
        price: 150,
        rent: 0,
        color: "",
        owner: null,
      },
      {
        name: "States Ave",
        type: "property",
        price: 140,
        rent: 10,
        color: "pink",
        houses: 0,
        owner: null,
      },
      {
        name: "Virginia Ave",
        type: "property",
        price: 160,
        rent: 12,
        color: "pink",
        houses: 0,
        owner: null,
      },
      {
        name: "Pennsylvania Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
      },
      {
        name: "St. James Place",
        type: "property",
        price: 180,
        rent: 14,
        color: "orange",
        houses: 0,
        owner: null,
      },
      { name: "Community Chest", type: "chest", price: 0, rent: 0, color: "" },
      {
        name: "Tennessee Ave",
        type: "property",
        price: 180,
        rent: 14,
        color: "orange",
        houses: 0,
        owner: null,
      },
      {
        name: "New York Ave",
        type: "property",
        price: 200,
        rent: 16,
        color: "orange",
        houses: 0,
        owner: null,
      },
      {
        name: "Free Parking",
        type: "free-parking",
        price: 0,
        rent: 0,
        color: "",
      },
      {
        name: "Kentucky Ave",
        type: "property",
        price: 220,
        rent: 18,
        color: "red",
        houses: 0,
        owner: null,
      },
      { name: "Chance", type: "chance", price: 0, rent: 0, color: "" },
      {
        name: "Indiana Ave",
        type: "property",
        price: 220,
        rent: 18,
        color: "red",
        houses: 0,
        owner: null,
      },
      {
        name: "Illinois Ave",
        type: "property",
        price: 240,
        rent: 20,
        color: "red",
        houses: 0,
        owner: null,
      },
      {
        name: "B&O Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
      },
      {
        name: "Atlantic Ave",
        type: "property",
        price: 260,
        rent: 22,
        color: "yellow",
        houses: 0,
        owner: null,
      },
      {
        name: "Ventnor Ave",
        type: "property",
        price: 260,
        rent: 22,
        color: "yellow",
        houses: 0,
        owner: null,
      },
      {
        name: "Water Works",
        type: "utility",
        price: 150,
        rent: 0,
        color: "",
        owner: null,
      },
      {
        name: "Marvin Gardens",
        type: "property",
        price: 280,
        rent: 24,
        color: "yellow",
        houses: 0,
        owner: null,
      },
      { name: "Go To Jail", type: "go-to-jail", price: 0, rent: 0, color: "" },
      {
        name: "Pacific Ave",
        type: "property",
        price: 300,
        rent: 26,
        color: "green",
        houses: 0,
        owner: null,
      },
      {
        name: "North Carolina Ave",
        type: "property",
        price: 300,
        rent: 26,
        color: "green",
        houses: 0,
        owner: null,
      },
      { name: "Community Chest", type: "chest", price: 0, rent: 0, color: "" },
      {
        name: "Pennsylvania Ave",
        type: "property",
        price: 320,
        rent: 28,
        color: "green",
        houses: 0,
        owner: null,
      },
      {
        name: "Short Line Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
      },
      { name: "Chance", type: "chance", price: 0, rent: 0, color: "" },
      {
        name: "Park Place",
        type: "property",
        price: 350,
        rent: 35,
        color: "dark-blue",
        houses: 0,
        owner: null,
      },
      { name: "Luxury Tax", type: "tax", price: 0, rent: 75, color: "" },
      {
        name: "Boardwalk",
        type: "property",
        price: 400,
        rent: 50,
        color: "dark-blue",
        houses: 0,
        owner: null,
      },
    ];
  }

  // Add this helper to show a modal with the card text
  showCardModal(cardText) {
    let modal = document.getElementById("cardModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cardModal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0,0,0,0.7)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";
      modal.innerHTML = `
      <div style="background:#fff;padding:32px 24px;border-radius:12px;min-width:320px;box-shadow:0 4px 32px #0006; text-align:center;">
        <h2>Card</h2>
        <div id="cardModalText" style="margin:16px 0;font-size:1.2em;"></div>
        <button id="closeCardModalBtn" class="btn btn-primary">OK</button>
      </div>
    `;
      document.body.appendChild(modal);
      modal.querySelector("#closeCardModalBtn").onclick = () => {
        modal.style.display = "none";
      };
    }
    modal.querySelector("#cardModalText").textContent = cardText;
    modal.style.display = "flex";
  }

  initializeBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    // Board positions: top row, right column, bottom row, left column (clockwise from top left)
    const positions = [
      // Top row (left to right)
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      // Right column (top to bottom, skipping top corner)
      [10, 1],
      [10, 2],
      [10, 3],
      [10, 4],
      [10, 5],
      [10, 6],
      [10, 7],
      [10, 8],
      [10, 9],
      [10, 10],
      // Bottom row (right to left, skipping right corner)
      [9, 10],
      [8, 10],
      [7, 10],
      [6, 10],
      [5, 10],
      [4, 10],
      [3, 10],
      [2, 10],
      [1, 10],
      [0, 10],
      // Left column (bottom to top, skipping bottom and top corners)
      [0, 9],
      [0, 8],
      [0, 7],
      [0, 6],
      [0, 5],
      [0, 4],
      [0, 3],
      [0, 2],
      [0, 1],
    ];

    const centerStart = 1;
    const centerEnd = 9;

    // Create all squares
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        // Center block (single large block)
        if (
          col >= centerStart &&
          col <= centerEnd &&
          row >= centerStart &&
          row <= centerEnd
        ) {
          if (col === centerStart && row === centerStart) {
            const centerBlock = document.createElement("div");
            centerBlock.className = "center-block";
            centerBlock.innerHTML = `
              <div class="center-card community-chest-card">
                <span>Community Chest</span>
              </div>
              <div class="center-card chance-card">
                <span>Chance</span>
              </div>
              <div class="center-monopoly">
                MONOPOLY
              </div>
              <div class="center-section free-parking-pot">
                <h3>Free Parking Pot</h3>
                <div id="center-free-parking-pot">$0</div>
              </div>
            `;
            centerBlock.style.gridColumn = `${centerStart + 1} / ${
              centerEnd + 2
            }`;
            centerBlock.style.gridRow = `${centerStart + 1} / ${centerEnd + 2}`;
            board.appendChild(centerBlock);
          }
          continue;
        }

        // Check if this position is part of the board
        const positionIndex = positions.findIndex(
          (pos) => pos[0] === col && pos[1] === row
        );

        const square = document.createElement("div");
        square.className = "square";

        if (positionIndex !== -1) {
          const property = this.properties[positionIndex];
          square.id = `square-${positionIndex}`;
          square.innerHTML = this.getSquareContent(property, positionIndex);
          square.className += ` ${property.type}`;
          if (property.color) {
            square.className += ` #c1c1c1`;
          }

          square.addEventListener("click", () =>
            this.showPropertyModal(positionIndex)
          );
        } else {
          // Only the corners around the center block
          square.style.background = "#2c3e50";
          square.innerHTML =
            '<div style="color: white; font-size: 12px;"> </div>';
        }

        board.appendChild(square);
      }
    }

    this.renderPlayers();
  }

  getSquareContent(property, index) {
    let content = `<div class="square-name">${property.name}</div>`;

    if (property.type === "property") {
      content = `
        <div class="property-color ${property.color}"></div>
        <div class="square-name">${property.name}</div>
        <div class="price">$${property.price}</div>
        <div class="houses" id="houses-${index}"></div>
      `;
    } else if (property.type === "railroad" || property.type === "utility") {
      content = `
        <div class="square-name">${property.name}</div>
        <div class="price">$${property.price}</div>
      `;
    } else if (property.type === "tax") {
      content = `
        <div class="square-name">${property.name}</div>
        <div class="price">$${property.rent}</div>
      `;
    } else if (property.type === "jail") {
      content = `
        <div class="jail-square">
          <div class="jail-label">Jail</div>
          <div class="just-visiting">Just Visiting</div>
        </div>
      `;
    }

    return content;
  }

  renderPlayers() {
    // Remove existing player markers
    document.querySelectorAll(".player").forEach((p) => p.remove());

    // Add player markers to their current positions
    this.players.forEach((player, index) => {
      const square = document.getElementById(`square-${player.position}`);
      if (square) {
        const playerMarker = document.createElement("div");
        playerMarker.className = `player player-${index + 1}`;
        playerMarker.textContent = index + 1;
        square.appendChild(playerMarker);
      }
    });
  }

  initializeEventListeners() {
    document
      .getElementById("rollDice")
      .addEventListener("click", () => this.rollDice());
    document
      .getElementById("buyProperty")
      .addEventListener("click", () => this.buyProperty());
    document
      .getElementById("endTurn")
      .addEventListener("click", () => this.endTurn());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("buyBtn")
      .addEventListener("click", () => this.buyFromModal());
  }

  rollDice() {
    if (!this.canRoll) return;

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    this.lastRoll = [dice1, dice2];

    document.getElementById("dice1").textContent = dice1;
    document.getElementById("dice2").textContent = dice2;

    const total = dice1 + dice2;
    const currentPlayer = this.players[this.currentPlayerIndex];
    const oldPosition = currentPlayer.position;
    currentPlayer.position = (currentPlayer.position + total) % 40;

    // Check if passed GO
    if (oldPosition + total >= 40 || currentPlayer.position < oldPosition) {
      currentPlayer.money += 200;
      currentPlayer.hasPassedGo = true;
      this.addMessage(
        `${currentPlayer.name} passed GO and collected $200!`,
        "success"
      );
    }

    this.renderPlayers();
    this.handleSquareLanding();

    this.canRoll = false;
    document.getElementById("rollDice").disabled = true;
    document.getElementById("endTurn").disabled = false;

    this.addMessage(
      `${currentPlayer.name} rolled ${dice1} + ${dice2} = ${total}`,
      "info"
    );
    this.updateDisplay();
  }

  handleSquareLanding() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const property = this.properties[currentPlayer.position];

    switch (property.type) {
      case "property":
      case "railroad":
      case "utility":
        if (!property.owner) {
          document.getElementById("buyProperty").disabled = false;
          this.addMessage(
            `${property.name} is available for $${property.price}`,
            "info"
          );
        } else if (property.owner !== this.currentPlayerIndex) {
          this.payRent(property);
        }
        break;
      case "tax":
        currentPlayer.money -= property.rent;
        this.freeParkingPot += property.rent; // Add tax to pot
        this.updateFreeParkingPotDisplay();
        this.addMessage(
          `${currentPlayer.name} paid $${property.rent} in taxes`,
          "warning"
        );
        break;
      case "card":
        this.drawCard();
        break;
      case "free-parking":
        if (this.freeParkingPot > 0) {
          currentPlayer.money += this.freeParkingPot;
          this.addMessage(
            `${currentPlayer.name} landed on Free Parking and won $${this.freeParkingPot}!`,
            "success"
          );
          this.freeParkingPot = 0;
          this.updateFreeParkingPotDisplay();
        } else {
          this.addMessage(
            `${currentPlayer.name} landed on Free Parking (no pot to collect).`,
            "info"
          );
        }
        break;
      case "go-to-jail":
        currentPlayer.position = 10; // Jail position
        this.renderPlayers();
        this.addMessage(`${currentPlayer.name} went to jail!`, "warning");
        break;
    }
  }

  updateFreeParkingPotDisplay() {
    const potDiv = document.getElementById("center-free-parking-pot");
    if (potDiv) {
      potDiv.textContent = `$${this.freeParkingPot}`;
    }
  }

  payRent(property) {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const owner = this.players[property.owner];
    let rent = property.rent;

    // Calculate rent based on property type and improvements
    if (property.type === "property") {
      rent = property.rent * (1 + property.houses);
    }

    currentPlayer.money -= rent;
    owner.money += rent;

    this.addMessage(
      `${currentPlayer.name} paid $${rent} rent to ${owner.name}`,
      "warning"
    );
  }

  buyProperty() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const property = this.properties[currentPlayer.position];

    if (!currentPlayer.hasPassedGo) {
      this.addMessage(
        `${currentPlayer.name} must pass GO before buying properties!`,
        "warning"
      );
      return;
    }

    if (currentPlayer.money >= property.price) {
      currentPlayer.money -= property.price;
      property.owner = this.currentPlayerIndex;
      currentPlayer.properties.push(currentPlayer.position);

      this.addMessage(
        `${currentPlayer.name} bought ${property.name} for $${property.price}`,
        "success"
      );
      document.getElementById("buyProperty").disabled = true;
      this.updateDisplay();
    } else {
      this.addMessage(
        `${currentPlayer.name} doesn't have enough money!`,
        "warning"
      );
    }
  }

  showInfoModal(message, onClose) {
    let modal = document.getElementById("infoModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "infoModal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100vw";
      modal.style.height = "100vh";
      modal.style.background = "rgba(0,0,0,0.7)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";
      modal.innerHTML = `
        <div style="background:#fff;padding:32px 24px;border-radius:12px;min-width:320px;box-shadow:0 4px 32px #0006; text-align:center;">
          <div id="infoModalText" style="margin:16px 0;font-size:1.2em;"></div>
          <button id="closeInfoModalBtn" class="btn btn-primary">OK</button>
          <button id="cancelInfoModalBtn" class="btn btn-secondary" style="margin-left:10px;">Cancel</button>
        </div>
      `;
      document.body.appendChild(modal);
    }
    modal.querySelector("#infoModalText").textContent = message;
    modal.style.display = "flex";
    // Always re-attach event listeners to ensure correct callback
    modal.querySelector("#closeInfoModalBtn").onclick = () => {
      modal.style.display = "none";
      if (typeof onClose === "function") onClose();
    };
    modal.querySelector("#cancelInfoModalBtn").onclick = () => {
      modal.style.display = "none";
    };
  }

  // Update drawCard to show the modal
  drawCard() {
    const cards = [
      {
        text: "Advance to GO, collect $200",
        action: () => {
          const player = this.players[this.currentPlayerIndex];
          player.position = 0;
          player.money += 200;
          player.hasPassedGo = true;
          this.renderPlayers();
        },
      },
      {
        text: "Pay $50 fine",
        action: () => {
          this.players[this.currentPlayerIndex].money -= 50;
          this.freeParkingPot += 50; // Add fine to pot
          this.updateFreeParkingPotDisplay();
        },
      },
      {
        text: "Collect $100",
        action: () => {
          this.players[this.currentPlayerIndex].money += 100;
        },
      },
      {
        text: "Go to Jail",
        action: () => {
          this.players[this.currentPlayerIndex].position = 10;
          this.renderPlayers();
        },
      },
    ];

    const card = cards[Math.floor(Math.random() * cards.length)];
    card.action();
    this.showCardModal(card.text); // Show modal with card text
    this.addMessage(`Card: ${card.text}`, "info");
  }

  endTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    this.canRoll = true;

    document.getElementById("rollDice").disabled = false;
    document.getElementById("buyProperty").disabled = true;
    document.getElementById("endTurn").disabled = true;

    this.updateDisplay();
    this.addMessage(
      `${this.players[this.currentPlayerIndex].name}'s turn`,
      "info"
    );
  }

  showPropertyModal(positionIndex) {
    const property = this.properties[positionIndex];
    const modal = document.getElementById("propertyModal");
    const title = document.getElementById("modalTitle");
    const content = document.getElementById("modalContent");
    const buyBtn = document.getElementById("buyBtn");

    title.textContent = property.name;

    let modalContent = `<p><strong>Type:</strong> ${property.type}</p>`;
    if (property.price > 0) {
      modalContent += `<p><strong>Price:</strong> $${property.price}</p>`;
    }
    if (property.rent > 0) {
      modalContent += `<p><strong>Rent:</strong> $${property.rent}</p>`;
    }
    if (property.owner !== null) {
      modalContent += `<p><strong>Owner:</strong> ${
        this.players[property.owner].name
      }</p>`;
    }

    content.innerHTML = modalContent;

    // Show/hide buy button
    const currentPlayer = this.players[this.currentPlayerIndex];
    const canBuy =
      !property.owner &&
      (property.type === "property" ||
        property.type === "railroad" ||
        property.type === "utility") &&
      currentPlayer.money >= property.price &&
      currentPlayer.position === positionIndex &&
      currentPlayer.hasPassedGo;

    buyBtn.style.display = canBuy ? "inline-block" : "none";
    buyBtn.onclick = () => {
      this.buyProperty();
      this.closeModal();
    };

    modal.style.display = "flex";
  }

  buyFromModal() {
    this.buyProperty();
    this.closeModal();
  }

  closeModal() {
    document.getElementById("propertyModal").style.display = "none";
  }

  updateDisplay() {
    const playersInfo = document.getElementById("players-info");
    playersInfo.innerHTML = "";

    this.players.forEach((player, index) => {
      const playerDiv = document.createElement("div");
      playerDiv.className = `player-info ${
        index === this.currentPlayerIndex ? "current-player" : ""
      }`;
      playerDiv.innerHTML = `
                  <h4 style="color: ${player.color};">${player.name}</h4>
                  <p><strong>Money:</strong> ${player.money}</p>
                  <p><strong>Position:</strong> ${
                    this.properties[player.position].name
                  }</p>
                  <p><strong>Properties:</strong> ${
                    player.properties.length
                  }</p>
              `;
      playersInfo.appendChild(playerDiv);
    });
  }

  addMessage(message, type = "info") {
    const messageLog = document.getElementById("messageLog");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageLog.appendChild(messageDiv);
    messageLog.scrollTop = messageLog.scrollHeight;

    // Keep only last 20 messages
    const messages = messageLog.querySelectorAll(".message");
    if (messages.length > 20) {
      messages[0].remove();
    }
  }

  startGame() {
    this.gameStarted = true;
    this.addMessage("Game started! Roll dice to begin.", "success");
    this.addMessage(`${this.players[0].name}'s turn`, "info");
  }

  checkGameEnd() {
    const activePlayers = this.players.filter((player) => player.money > 0);
    if (activePlayers.length === 1) {
      this.addMessage(`${activePlayers[0].name} wins the game!`, "success");
      return true;
    }
    return false;
  }

  // Additional utility methods
  getPlayerNetWorth(player) {
    let netWorth = player.money;
    player.properties.forEach((propIndex) => {
      const property = this.properties[propIndex];
      netWorth += property.price;
      if (property.houses) {
        netWorth += property.houses * 50; // Assuming $50 per house
      }
    });
    return netWorth;
  }

  canBuildHouse(propertyIndex) {
    const property = this.properties[propertyIndex];
    const currentPlayer = this.players[this.currentPlayerIndex];

    // Check if player owns all properties of this color group
    const colorGroup = this.properties.filter(
      (prop) => prop.color === property.color && prop.type === "property"
    );
    const ownedInGroup = colorGroup.filter(
      (prop) => prop.owner === this.currentPlayerIndex
    );

    return ownedInGroup.length === colorGroup.length && property.houses < 4;
  }

  buildHouse(propertyIndex) {
    const property = this.properties[propertyIndex];
    const currentPlayer = this.players[this.currentPlayerIndex];
    const houseCost = 50; // Standard house cost

    if (this.canBuildHouse(propertyIndex) && currentPlayer.money >= houseCost) {
      currentPlayer.money -= houseCost;
      property.houses++;
      this.updateHouseDisplay(propertyIndex);
      this.addMessage(
        `${currentPlayer.name} built a house on ${property.name}`,
        "success"
      );
      this.updateDisplay();
    }
  }

  updateHouseDisplay(propertyIndex) {
    const housesContainer = document.getElementById(`houses-${propertyIndex}`);
    if (housesContainer) {
      const property = this.properties[propertyIndex];
      housesContainer.innerHTML = "";

      if (property.houses === 5) {
        // Hotel
        const hotel = document.createElement("div");
        hotel.className = "hotel";
        housesContainer.appendChild(hotel);
      } else {
        // Houses
        for (let i = 0; i < property.houses; i++) {
          const house = document.createElement("div");
          house.className = "house";
          housesContainer.appendChild(house);
        }
      }
    }
  }

  // Trade system (simplified)
  initiateTradeOffer(
    fromPlayer,
    toPlayer,
    offerMoney,
    offerProperties,
    requestMoney,
    requestProperties
  ) {
    // This would open a trade modal in a full implementation
    this.addMessage(
      `Trade offer initiated between ${this.players[fromPlayer].name} and ${this.players[toPlayer].name}`,
      "info"
    );
  }

  // Mortgage system
  mortgageProperty(propertyIndex) {
    const property = this.properties[propertyIndex];
    const currentPlayer = this.players[this.currentPlayerIndex];

    if (property.owner === this.currentPlayerIndex && !property.mortgaged) {
      const mortgageValue = Math.floor(property.price / 2);
      currentPlayer.money += mortgageValue;
      property.mortgaged = true;
      this.addMessage(
        `${currentPlayer.name} mortgaged ${property.name} for ${mortgageValue}`,
        "warning"
      );
      this.updateDisplay();
    }
  }

  unmortgageProperty(propertyIndex) {
    const property = this.properties[propertyIndex];
    const currentPlayer = this.players[this.currentPlayerIndex];

    if (property.owner === this.currentPlayerIndex && property.mortgaged) {
      const unmortgageCost = Math.floor(property.price / 2) * 1.1; // 10% interest
      if (currentPlayer.money >= unmortgageCost) {
        currentPlayer.money -= unmortgageCost;
        property.mortgaged = false;
        this.addMessage(
          `${currentPlayer.name} unmortgaged ${property.name} for ${unmortgageCost}`,
          "success"
        );
        this.updateDisplay();
      }
    }
  }

  // Auction system for unpurchased properties
  startAuction(propertyIndex) {
    const property = this.properties[propertyIndex];
    this.addMessage(`Auction started for ${property.name}!`, "info");
    // In a full implementation, this would handle bidding rounds

    // Simplified auction - random winner for demo
    const eligiblePlayers = this.players.filter((player) => player.money >= 10);
    if (eligiblePlayers.length > 0) {
      const winner =
        eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
      const winningBid = Math.floor(
        property.price * (0.5 + Math.random() * 0.4)
      );

      if (winner.money >= winningBid) {
        winner.money -= winningBid;
        property.owner = this.players.indexOf(winner);
        winner.properties.push(propertyIndex);
        this.addMessage(
          `${winner.name} won the auction for ${property.name} with a bid of ${winningBid}!`,
          "success"
        );
        this.updateDisplay();
      }
    }
  }

  // Enhanced dice rolling with doubles detection
  rollDiceWithDoubles() {
    if (!this.canRoll) return;

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = dice1 === dice2;

    this.lastRoll = [dice1, dice2];

    document.getElementById("dice1").textContent = dice1;
    document.getElementById("dice2").textContent = dice2;

    const total = dice1 + dice2;
    const currentPlayer = this.players[this.currentPlayerIndex];

    if (isDoubles) {
      currentPlayer.doublesCount = (currentPlayer.doublesCount || 0) + 1;
      if (currentPlayer.doublesCount >= 3) {
        // Go to jail for rolling 3 doubles
        currentPlayer.position = 10;
        currentPlayer.doublesCount = 0;
        this.addMessage(
          `${currentPlayer.name} rolled 3 doubles and went to jail!`,
          "warning"
        );
        this.renderPlayers();
        this.endTurn();
        return;
      } else {
        this.addMessage(
          `${currentPlayer.name} rolled doubles! Roll again after your turn.`,
          "success"
        );
      }
    } else {
      currentPlayer.doublesCount = 0;
    }

    // Move player
    const oldPosition = currentPlayer.position;
    currentPlayer.position = (currentPlayer.position + total) % 40;

    // Check if passed GO
    if (oldPosition + total >= 40 || currentPlayer.position < oldPosition) {
      currentPlayer.money += 200;
      currentPlayer.hasPassedGo = true;
      this.addMessage(
        `${currentPlayer.name} passed GO and collected $200!`,
        "success"
      );
    }

    this.renderPlayers();
    this.handleSquareLanding();

    if (!isDoubles) {
      this.canRoll = false;
      document.getElementById("rollDice").disabled = true;
      document.getElementById("endTurn").disabled = false;
    } else {
      this.addMessage(`${currentPlayer.name} can roll again!`, "info");
    }

    this.addMessage(
      `${currentPlayer.name} rolled ${dice1} + ${dice2} = ${total}${
        isDoubles ? " (Doubles!)" : ""
      }`,
      "info"
    );
    this.updateDisplay();
  }

  // Initialize game with proper setup
  initializeGame() {
    this.showInfoModal("A new game is about to start!", () => {
      // Reset all players
      this.players.forEach((player) => {
        player.money = 1500;
        player.position = 0;
        player.properties = [];
        player.doublesCount = 0;
        player.hasPassedGo = false;
      });

      // Reset all properties
      this.properties.forEach((property) => {
        if (
          property.type === "property" ||
          property.type === "railroad" ||
          property.type === "utility"
        ) {
          property.owner = null;
          property.houses = 0;
          property.mortgaged = false;
        }
      });

      this.currentPlayerIndex = 0;
      this.canRoll = true;
      this.gameStarted = true;

      // Clear message log
      document.getElementById("messageLog").innerHTML = "";

      const dice1 = document.getElementById("dice1");
      const dice2 = document.getElementById("dice2");
      if (dice1 && dice2) {
        dice1.innerHTML = "🎲";
        dice2.innerHTML = "🎲";
      }

      this.renderPlayers();
      this.updateDisplay();
      this.addMessage(
        "New game started! Each player begins with $1500.",
        "success"
      );
      this.addMessage(
        `${this.players[0].name}'s turn - roll the dice!`,
        "info"
      );
    });
  }
}

// Initialize the game when the page loads
let game;
window.addEventListener("DOMContentLoaded", () => {
  game = new MonopolyGame();

  // Override the rollDice method to use the enhanced version
  document
    .getElementById("rollDice")
    .removeEventListener("click", game.rollDice);
  document
    .getElementById("rollDice")
    .addEventListener("click", () => game.rollDiceWithDoubles());

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault();
        if (!document.getElementById("rollDice").disabled) {
          game.rollDiceWithDoubles();
        }
        break;
      case "b":
      case "B":
        if (!document.getElementById("buyProperty").disabled) {
          game.buyProperty();
        }
        break;
      case "e":
      case "E":
        if (!document.getElementById("endTurn").disabled) {
          game.endTurn();
        }
        break;
    }
  });

  // Add restart button
  const restartBtn = document.createElement("button");
  restartBtn.className = "btn btn-primary";
  restartBtn.textContent = "New Game";
  restartBtn.style.marginTop = "10px";
  restartBtn.addEventListener("click", () => {
    game.showInfoModal("Start a new game? Current progress will be lost.", () => {
      game.initializeGame();
    });
  });
  document.querySelector(".controls").appendChild(restartBtn);
});
