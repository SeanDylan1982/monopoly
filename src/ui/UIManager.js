export class UIManager {
  constructor(gameLogic) {
    this.gameLogic = gameLogic;
  }

  initializeBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    // Board positions: top row, right column, bottom row, left column (clockwise from top left)
    const positions = [
      // Top row (left to right)
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],
      // Right column (top to bottom, skipping top corner)
      [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10],
      // Bottom row (right to left, skipping right corner)
      [9, 10], [8, 10], [7, 10], [6, 10], [5, 10], [4, 10], [3, 10], [2, 10], [1, 10], [0, 10],
      // Left column (bottom to top, skipping bottom and top corners)
      [0, 9], [0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1]
    ];

    const centerStart = 1;
    const centerEnd = 9;

    // Create all squares
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        // Center block (single large block)
        if (col >= centerStart && col <= centerEnd && row >= centerStart && row <= centerEnd) {
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
            centerBlock.style.gridColumn = `${centerStart + 1} / ${centerEnd + 2}`;
            centerBlock.style.gridRow = `${centerStart + 1} / ${centerEnd + 2}`;
            board.appendChild(centerBlock);
          }
          continue;
        }

        // Check if this position is part of the board
        const positionIndex = positions.findIndex(pos => pos[0] === col && pos[1] === row);

        const square = document.createElement("div");
        square.className = "square";

        if (positionIndex !== -1) {
          const property = this.gameLogic.gameState.getProperty(positionIndex);
          square.id = `square-${positionIndex}`;
          square.innerHTML = this.getSquareContent(property, positionIndex);
          square.className += ` ${property.type}`;
          if (property.color) {
            square.className += ` ${property.color}`;
          }

          square.addEventListener("click", () => this.showPropertyModal(positionIndex));
        } else {
          square.style.background = "#2c3e50";
          square.innerHTML = '<div style="color: white; font-size: 12px;"> </div>';
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
        ${property.mortgaged ? '<div class="mortgaged">MORTGAGED</div>' : ''}
      `;
    } else if (property.type === "railroad" || property.type === "utility") {
      content = `
        <div class="square-name">${property.name}</div>
        <div class="price">$${property.price}</div>
        ${property.mortgaged ? '<div class="mortgaged">MORTGAGED</div>' : ''}
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
    document.querySelectorAll(".player").forEach(p => p.remove());

    // Add player markers to their current positions
    this.gameLogic.gameState.players.forEach((player, index) => {
      const square = document.getElementById(`square-${player.position}`);
      if (square) {
        const playerMarker = document.createElement("div");
        playerMarker.className = `player player-${index + 1}`;
        playerMarker.textContent = index + 1;
        if (player.inJail) {
          playerMarker.classList.add("in-jail");
        }
        square.appendChild(playerMarker);
      }
    });
  }

  initializeEventListeners() {
    document.getElementById("rollDice").addEventListener("click", () => this.gameLogic.rollDice());
    document.getElementById("buyProperty").addEventListener("click", () => this.gameLogic.buyProperty());
    document.getElementById("endTurn").addEventListener("click", () => this.gameLogic.endTurn());
    document.getElementById("closeModal").addEventListener("click", () => this.closeModal());
    document.getElementById("buyBtn").addEventListener("click", () => this.buyFromModal());

    // Add keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          if (!document.getElementById("rollDice").disabled) {
            this.gameLogic.rollDice();
          }
          break;
        case "b":
        case "B":
          if (!document.getElementById("buyProperty").disabled) {
            this.gameLogic.buyProperty();
          }
          break;
        case "e":
        case "E":
          if (!document.getElementById("endTurn").disabled) {
            this.gameLogic.endTurn();
          }
          break;
      }
    });

    // Add new game button
    const newGameBtn = document.createElement("button");
    newGameBtn.className = "btn btn-primary";
    newGameBtn.textContent = "New Game";
    newGameBtn.style.marginTop = "10px";
    newGameBtn.addEventListener("click", () => {
      this.showConfirmModal("Start a new game? Current progress will be lost.", () => {
        this.gameLogic.newGame();
      });
    });
    document.querySelector(".controls").appendChild(newGameBtn);
  }

  updateDiceDisplay(dice1, dice2) {
    document.getElementById("dice1").textContent = dice1;
    document.getElementById("dice2").textContent = dice2;
  }

  resetDiceDisplay() {
    document.getElementById("dice1").textContent = "🎲";
    document.getElementById("dice2").textContent = "🎲";
  }

  updateControlButtons() {
    const canRoll = this.gameLogic.gameState.canRoll;
    document.getElementById("rollDice").disabled = !canRoll;
    document.getElementById("endTurn").disabled = canRoll;
    
    // Buy button is handled separately in game logic
    if (canRoll) {
      document.getElementById("buyProperty").disabled = true;
    }
  }

  enableBuyButton() {
    document.getElementById("buyProperty").disabled = false;
  }

  disableBuyButton() {
    document.getElementById("buyProperty").disabled = true;
  }

  updateFreeParkingPotDisplay() {
    const potDiv = document.getElementById("center-free-parking-pot");
    if (potDiv) {
      potDiv.textContent = `$${this.gameLogic.gameState.freeParkingPot}`;
    }
  }

  updateDisplay() {
    const playersInfo = document.getElementById("players-info");
    playersInfo.innerHTML = "";

    this.gameLogic.gameState.players.forEach((player, index) => {
      const playerDiv = document.createElement("div");
      playerDiv.className = `player-info ${index === this.gameLogic.gameState.currentPlayerIndex ? "current-player" : ""}`;
      
      let statusText = "";
      if (player.inJail) {
        statusText = ` (In Jail ${player.jailTurns}/3)`;
      }
      
      playerDiv.innerHTML = `
        <h4 style="color: ${player.color};">${player.name}${statusText}</h4>
        <p><strong>Money:</strong> $${player.money}</p>
        <p><strong>Position:</strong> ${this.gameLogic.gameState.getProperty(player.position).name}</p>
        <p><strong>Properties:</strong> ${player.properties.length}</p>
      `;
      playersInfo.appendChild(playerDiv);
    });
  }

  showPropertyModal(positionIndex) {
    const property = this.gameLogic.gameState.getProperty(positionIndex);
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
      modalContent += `<p><strong>Owner:</strong> ${this.gameLogic.gameState.players[property.owner].name}</p>`;
    }
    if (property.mortgaged) {
      modalContent += `<p><strong>Status:</strong> Mortgaged</p>`;
    }

    content.innerHTML = modalContent;

    // Show/hide buy button
    const currentPlayer = this.gameLogic.gameState.getCurrentPlayer();
    const canBuy = !property.owner &&
      (property.type === "property" || property.type === "railroad" || property.type === "utility") &&
      currentPlayer.money >= property.price &&
      currentPlayer.position === positionIndex &&
      currentPlayer.hasPassedGo;

    buyBtn.style.display = canBuy ? "inline-block" : "none";

    modal.style.display = "flex";
  }

  buyFromModal() {
    this.gameLogic.buyProperty();
    this.closeModal();
  }

  closeModal() {
    document.getElementById("propertyModal").style.display = "none";
  }

  showCardModal(cardText) {
    let modal = document.getElementById("cardModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cardModal";
      modal.className = "property-modal";
      modal.innerHTML = `
        <div class="modal-content">
          <h3>Card</h3>
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

  showConfirmModal(message, onConfirm) {
    let modal = document.getElementById("confirmModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "confirmModal";
      modal.className = "property-modal";
      modal.innerHTML = `
        <div class="modal-content">
          <div id="confirmModalText" style="margin:16px 0;font-size:1.2em;"></div>
          <div style="margin-top: 20px;">
            <button id="confirmBtn" class="btn btn-primary">Confirm</button>
            <button id="cancelBtn" class="btn btn-danger" style="margin-left: 10px;">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
    
    modal.querySelector("#confirmModalText").textContent = message;
    modal.style.display = "flex";
    
    modal.querySelector("#confirmBtn").onclick = () => {
      modal.style.display = "none";
      if (onConfirm) onConfirm();
    };
    
    modal.querySelector("#cancelBtn").onclick = () => {
      modal.style.display = "none";
    };
  }

  showGameEndModal(winner) {
    this.showConfirmModal(`🎉 ${winner.name} wins the game! 🎉\n\nStart a new game?`, () => {
      this.gameLogic.newGame();
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

  clearMessageLog() {
    document.getElementById("messageLog").innerHTML = "";
  }
}