[![Netlify Status](https://api.netlify.com/api/v1/badges/3e737f73-01c8-48fa-9874-afe88485200a/deploy-status)](https://app.netlify.com/projects/monopoly-benoni/deploys)

https://monopoly-benoni.netlify.app/

<img width="1919" height="897" alt="image" src="https://github.com/user-attachments/assets/7d7e07c7-bcc1-48f6-9469-f574680b1521" />

# Monopoly Game (Web-Based)

A classic Monopoly game implemented as a web application, allowing multiple players to compete, buy properties, collect rent, and manage their finances.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Multi-Player Support**: Up to 4 players can join a game.
- **Interactive Board**: A visually represented Monopoly board with squares for properties, chance, community chest, and special spaces.
- **Dice Rolling**: Simulate dice rolls to move players around the board.
- **Property Management**: Buy properties, collect rent, and manage your portfolio.
- **Dynamic UI Updates**: Real-time updates for player money, position, and property ownership.
- **Message Log**: Keep track of game events and player actions.
- **Free Parking Pot**: Accumulates tax payments and can be collected by landing on Free Parking.
- **Jail System**: Players can be sent to jail.
- **Pass GO Bonus**: Players collect $200 when passing or landing on GO.
- **Doubles Detection**: Roll doubles to get an extra turn, but three consecutive doubles send you to jail.
- **Property Modals**: Detailed information about properties on click.
- **Keyboard Shortcuts**: `Space`/`Enter` to roll dice, `B` to buy property, `E` to end turn.
- **New Game Functionality**: Easily restart the game.

## How to Play

1.  **Start the Game**: Open `index.html` in your web browser. The game will automatically initialize with 4 players.
2.  **Roll the Dice**: Click the "Roll Dice" button or press `Space`/`Enter` to roll the dice and move your player.
3.  **Land on a Square**:
    - **Properties**: If you land on an unowned property, you'll have the option to buy it if you have enough money and have passed GO. If owned by another player, you'll pay rent.
    - **Tax**: Pay the specified tax amount, which goes into the Free Parking pot.
    - **Chance/Community Chest**: Draw a card and follow its instructions.
    - **Free Parking**: Collect the accumulated Free Parking pot.
    - **Go to Jail**: Immediately move to jail.
    - **GO**: Collect $200 when passing or landing on GO.
4.  **Buy Property**: If a property is available and you have enough money, click the "Buy Property" button.
5.  **End Turn**: After your actions, click "End Turn" to pass the turn to the next player.
6.  **Win the Game**: Be the last player remaining with money and properties.

## Installation

This project is a client-side web application and does not require any backend setup or complex installation.

1.  **Clone the repository (if applicable)**:
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd monopoly
    ```
3.  **Open `index.html`**: Simply open the `index.html` file in your preferred web browser.

## Technologies Used

- **HTML5**: For the structure and content of the web pages.
- **CSS3**: For styling the game board, players, and UI elements.
- **JavaScript (ES6+)**: For game logic, player interactions, and dynamic updates.

## Project Structure

```
.
├── index.html          # Main HTML file for the game interface
├── app.js              # Core JavaScript file containing game logic
├── style.css           # Stylesheet for the game's visual presentation
├── .gitignore          # Specifies intentionally untracked files to ignore
└── .vscode/settings.json # VS Code editor settings
```

## Future Enhancements

The current implementation provides a solid foundation for a Monopoly game. Potential future enhancements include:

- **Building Houses/Hotels**: Implement functionality for players to build houses and hotels on their properties.
- **Trading System**: Allow players to trade properties and money.
- **Mortgaging Properties**: Enable players to mortgage their properties for cash.
- **Auction System**: Implement auctions for unpurchased properties.
- **Improved UI/UX**: More sophisticated animations, sound effects, and visual feedback.
- **Community Chest/Chance Card Logic**: Expand the variety and complexity of card effects.
- **Game Saving/Loading**: Persist game state.
- **Multiplayer Networking**: Convert to a true online multiplayer game.

## License

This project is open-source and available under the [MIT License](LICENSE).
