# Battleship

A classic Battleship naval warfare game built with vanilla JavaScript, featuring smart AI, interactive ship placement, sound effects, and a sleek dark-themed UI.

## Features

- **Interactive Ship Placement** — Click cells on your board to manually place ships with togglable orientation (horizontal/vertical). Or use the Randomize button for instant setup.
- **Smart AI Opponent** — The computer uses a hunt/target algorithm: after scoring a hit, it intelligently searches adjacent cells instead of firing randomly.
- **Sound Effects** — Synthesized audio feedback for hits, misses, sinking ships, and game over using the Web Audio API. Toggle sound on/off with the speaker button.
- **Visual Animations** — Explosion effects on hits, splash effects on misses, screen shake when your fleet takes damage, sink animations, and more.
- **Game Stats** — Track your hits, misses, and turns during battle.
- **Fleet Health Display** — See the status of each ship in your fleet at a glance with health indicators.
- **Responsive Design** — Adapts seamlessly from desktop to mobile with a dark ocean-themed UI.
- **Reveal on Game Over** — When the game ends, all enemy ship positions are revealed.

## How to Play

1. **Place your ships** — Click cells on your "Your Fleet" board to place each ship. Use the orientation button to toggle between horizontal and vertical placement. The 5 ships to place are: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), and Destroyer (2).
2. **Start the battle** — Once all ships are placed, click **Start Battle**.
3. **Attack** — Click cells on the "Enemy Waters" board to fire. A red **✕** means a hit, a gray **•** means a miss.
4. **Win** — Sink all 5 enemy ships before your fleet is destroyed.

## Project Structure

```
BattleshipProject/
├── src/
│   ├── index.js              # Game entry point — state machine, phase management, event wiring
│   ├── styles.css             # All styles — dark ocean theme, animations, responsive
│   ├── template.html          # HTML template — board layout, controls, UI elements
│   ├── modules/
│   │   ├── Ship.js            # Ship class — length, hits, sunk status
│   │   ├── Gameboard.js       # Gameboard — 10x10 grid, ship placement, attack handling
│   │   └── Player.js          # Player — human attack, random + smart AI (hunt/target)
│   └── ui/
│       ├── DOMController.js   # UI controller — board rendering, animations, event binding
│       └── SoundManager.js    # Audio manager — Web Audio API synthesized sound effects
├── tests/
│   ├── Ship.test.js           # Unit tests for Ship
│   ├── Gameboard.test.js      # Unit tests for Gameboard
│   ├── Player.test.js         # Unit tests for Player
│   └── DOMController.test.js  # Unit tests for DOMController
├── dist/                      # Webpack build output (gitignored)
├── .gitignore
├── jest.config.js             # Jest test configuration
├── package.json               # Dependencies and scripts
└── webpack.config.js          # Webpack build configuration
```

## Technologies

- **Vanilla JavaScript (ES6)** — Classes, modules, arrow functions
- **Webpack 5** — Module bundling, dev server, asset loading
- **Jest** — Unit testing (30 tests across 4 suites)
- **Web Audio API** — Synthesized sound effects
- **CSS3** — Grid layout, animations, keyframes, responsive design
- **Google Fonts** — Orbitron (headings) + Rajdhani (body)

## Setup

```bash
# Install dependencies
npm install

# Start development server (hot reload)
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run watch
```

## Game Phases

| Phase | Description |
|-------|-------------|
| **Placement** | Arrange your fleet on the board manually or via randomize |
| **Battle** | Take turns attacking the enemy board; computer responds with smart AI |
| **Game Over** | Final result displayed; all ships revealed; option to play again |

## Future Improvements

- Drag-and-drop ship placement
- Multiplayer (local hot-seat)
- Difficulty levels (Easy / Medium / Hard)
- High-score tracking
- Network multiplayer

## Author

Created by **SeifElislam**
