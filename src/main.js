import { GameLogic } from './game/GameLogic.js';

// Initialize the game when the page loads
let game;
window.addEventListener("DOMContentLoaded", () => {
  game = new GameLogic();
});

// Export for debugging purposes
window.game = game;