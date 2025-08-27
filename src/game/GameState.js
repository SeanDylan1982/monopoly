export class GameState {
  constructor() {
    this.players = this.initializePlayers();
    this.currentPlayerIndex = 0;
    this.gameStarted = false;
    this.lastRoll = [0, 0];
    this.canRoll = true;
    this.freeParkingPot = 0;
    this.doublesCount = 0;
    this.properties = this.initializeProperties();
  }

  initializePlayers() {
    return [
      {
        id: 1,
        name: "Player 1",
        money: 1500,
        position: 0,
        properties: [],
        color: "#e74c3c",
        hasPassedGo: false,
        doublesCount: 0,
        inJail: false,
        jailTurns: 0
      },
      {
        id: 2,
        name: "Player 2",
        money: 1500,
        position: 0,
        properties: [],
        color: "#3498db",
        hasPassedGo: false,
        doublesCount: 0,
        inJail: false,
        jailTurns: 0
      },
      {
        id: 3,
        name: "Player 3",
        money: 1500,
        position: 0,
        properties: [],
        color: "#2ecc71",
        hasPassedGo: false,
        doublesCount: 0,
        inJail: false,
        jailTurns: 0
      },
      {
        id: 4,
        name: "Player 4",
        money: 1500,
        position: 0,
        properties: [],
        color: "#f39c12",
        hasPassedGo: false,
        doublesCount: 0,
        inJail: false,
        jailTurns: 0
      }
    ];
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
        mortgaged: false
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
        mortgaged: false
      },
      { name: "Income Tax", type: "tax", price: 0, rent: 200, color: "" },
      {
        name: "Reading Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
        mortgaged: false
      },
      {
        name: "Oriental Ave",
        type: "property",
        price: 100,
        rent: 6,
        color: "light-blue",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "Connecticut Ave",
        type: "property",
        price: 120,
        rent: 8,
        color: "light-blue",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "Electric Company",
        type: "utility",
        price: 150,
        rent: 0,
        color: "",
        owner: null,
        mortgaged: false
      },
      {
        name: "States Ave",
        type: "property",
        price: 140,
        rent: 10,
        color: "pink",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "Virginia Ave",
        type: "property",
        price: 160,
        rent: 12,
        color: "pink",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "Pennsylvania Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
        mortgaged: false
      },
      {
        name: "St. James Place",
        type: "property",
        price: 180,
        rent: 14,
        color: "orange",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "New York Ave",
        type: "property",
        price: 200,
        rent: 16,
        color: "orange",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "Free Parking",
        type: "free-parking",
        price: 0,
        rent: 0,
        color: ""
      },
      {
        name: "Kentucky Ave",
        type: "property",
        price: 220,
        rent: 18,
        color: "red",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "Illinois Ave",
        type: "property",
        price: 240,
        rent: 20,
        color: "red",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "B&O Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
        mortgaged: false
      },
      {
        name: "Atlantic Ave",
        type: "property",
        price: 260,
        rent: 22,
        color: "yellow",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "Ventnor Ave",
        type: "property",
        price: 260,
        rent: 22,
        color: "yellow",
        houses: 0,
        owner: null,
        mortgaged: false
      },
      {
        name: "Water Works",
        type: "utility",
        price: 150,
        rent: 0,
        color: "",
        owner: null,
        mortgaged: false
      },
      {
        name: "Marvin Gardens",
        type: "property",
        price: 280,
        rent: 24,
        color: "yellow",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "North Carolina Ave",
        type: "property",
        price: 300,
        rent: 26,
        color: "green",
        houses: 0,
        owner: null,
        mortgaged: false
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
        mortgaged: false
      },
      {
        name: "Short Line Railroad",
        type: "railroad",
        price: 200,
        rent: 25,
        color: "",
        owner: null,
        mortgaged: false
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
        mortgaged: false
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
        mortgaged: false
      }
    ];
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getProperty(index) {
    return this.properties[index];
  }

  resetGame() {
    this.players = this.initializePlayers();
    this.currentPlayerIndex = 0;
    this.gameStarted = false;
    this.lastRoll = [0, 0];
    this.canRoll = true;
    this.freeParkingPot = 0;
    this.doublesCount = 0;
    this.properties = this.initializeProperties();
  }
}