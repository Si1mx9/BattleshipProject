import './styles.css';
import Player from './modules/Player';
import DOMController from './ui/DOMController';

DOMController.init();

let human;
let computer;
let gameStarted = false;
let gameOver = false;

// Ship sizes for standard Battleship
const shipLengths = [5, 4, 3, 3, 2];

function initGame() {
  human = new Player('human');
  computer = new Player('computer');
  gameStarted = false;
  gameOver = false;
  
  DOMController.computerSectionEl = document.querySelector('.computer-section');
  DOMController.computerSectionEl.classList.remove('game-over');
  
  DOMController.randomizeBtn.classList.remove('hidden');
  DOMController.startBtn.classList.remove('hidden');
  DOMController.restartBtn.classList.add('hidden');
  
  randomizeBoard(human.gameboard);
  randomizeBoard(computer.gameboard);
  
  renderBoards();
  DOMController.updateFleetStatus(human.gameboard.getRemainingShips());
  DOMController.updateMessage('Place your ships or Randomize! Click Start when ready.');
}

function randomizeBoard(gameboard) {
  // Clear existing boards
  gameboard.board = Array(10).fill(null).map(() => Array(10).fill(null));
  gameboard.ships = [];
  gameboard.missedAttacks = [];

  shipLengths.forEach(length => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const isVertical = Math.random() > 0.5;
      
      try {
        gameboard.placeShip(length, row, col, isVertical);
        placed = true;
      } catch (e) {
        // Overlap or out of bounds, try again
      }
    }
  });
}

function renderBoards() {
  DOMController.renderBoard(DOMController.playerBoardEl, human.gameboard, false);
  DOMController.renderBoard(DOMController.computerBoardEl, computer.gameboard, true);
}

function handleAttack(row, col) {
  if (!gameStarted || gameOver) return;

  const spot = computer.gameboard.board[row][col];
  if (spot === 'hit' || spot === 'miss') {
    return;
  }
  
  human.attack(computer.gameboard, row, col);
  
  renderBoards();

  if (computer.gameboard.allShipsSunk()) {
    endGame('You win! 🏆');
    return;
  }

  // Computer's turn
  DOMController.updateMessage('Enemy is attacking...');
  
  setTimeout(() => {
    if (gameOver) return;
    
    computer.randomAttack(human.gameboard);
  renderBoards();
  DOMController.updateFleetStatus(human.gameboard.getRemainingShips());
    
    if (human.gameboard.allShipsSunk()) {
      endGame('You lost! The enemy destroyed your fleet. 💥');
    } else {
      DOMController.updateMessage('Your turn! Attack the enemy waters.');
    }
  }, 600);
}

function endGame(message) {
  gameOver = true;
  DOMController.updateMessage(message);
  DOMController.showGameOver(DOMController.computerSectionEl);
  renderBoards();
}

// Bind events
DOMController.bindAttackHandler(handleAttack);

DOMController.bindRandomizeHandler(() => {
  if (gameStarted) return;
  randomizeBoard(human.gameboard);
  renderBoards();
  DOMController.updateFleetStatus(human.gameboard.getRemainingShips());
});

DOMController.bindStartHandler(() => {
  if (gameStarted) return;
  gameStarted = true;
  DOMController.randomizeBtn.classList.add('hidden');
  DOMController.startBtn.classList.add('hidden');
  DOMController.updateMessage('Game Started! Your turn to attack.');
});

DOMController.bindRestartHandler(() => {
  initGame();
});

// Start
initGame();
