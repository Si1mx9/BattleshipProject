import './styles.css';
import Player from './modules/Player';
import DOMController from './ui/DOMController';
import SoundManager from './ui/SoundManager';

const PHASES = { PLACEMENT: 0, BATTLE: 1, GAME_OVER: 2 };

const SHIP_LENGTHS = [5, 4, 3, 3, 2];
const SHIP_NAMES = ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'];

const state = {
  phase: PHASES.PLACEMENT,
  human: null,
  computer: null,
  currentShipIdx: 0,
  isVertical: true,
  stats: { hits: 0, misses: 0, turns: 0 },
};

DOMController.init();

function initGame() {
  state.phase = PHASES.PLACEMENT;
  state.human = new Player('human');
  state.computer = new Player('computer');
  state.currentShipIdx = 0;
  state.isVertical = true;
  state.stats = { hits: 0, misses: 0, turns: 0 };
  state.computer.resetAI();

  randomizeBoard(state.computer.gameboard);
  resetPlayerBoard();

  DOMController.computerSectionEl = document.querySelector('.computer-section');
  DOMController.computerSectionEl.classList.remove('game-over');
  DOMController.restartBtn.classList.add('hidden');
  DOMController.setPlacementMode(true);
  DOMController.statsContainerEl.classList.add('hidden');

  updateOrientationLabel();
  renderBoards(false);
  updatePlacementUI();
  DOMController.updateFleetStatus(state.human.gameboard.getRemainingShips());
  DOMController.updateMessage('Place your ships by clicking cells on your board. Click Start when ready.');
  DOMController.renderFleetHealth(state.human.gameboard);
}

function resetPlayerBoard() {
  state.human.gameboard.board = Array(10).fill(null).map(() => Array(10).fill(null));
  state.human.gameboard.ships = [];
  state.human.gameboard.missedAttacks = [];
}

function randomizeBoard(gameboard) {
  gameboard.board = Array(10).fill(null).map(() => Array(10).fill(null));
  gameboard.ships = [];
  gameboard.missedAttacks = [];

  SHIP_LENGTHS.forEach(length => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      const isVertical = Math.random() > 0.5;
      try {
        gameboard.placeShip(length, row, col, isVertical);
        placed = true;
      } catch (e) { }
    }
  });
}

function renderBoards(revealShips) {
  DOMController.renderBoard(DOMController.playerBoardEl, state.human.gameboard, false);
  DOMController.renderBoard(DOMController.computerBoardEl, state.computer.gameboard, true, revealShips);
  DOMController.renderFleetHealth(state.human.gameboard);
}

function updatePlacementUI() {
  DOMController.updatePlacementInfo(
    state.currentShipIdx,
    SHIP_LENGTHS.length,
    SHIP_NAMES,
    state.isVertical
  );
  const placed = state.currentShipIdx >= SHIP_LENGTHS.length;
  DOMController.startBtn.classList.toggle('hidden', !placed);
  DOMController.randomizeBtn.classList.toggle('hidden', placed);
}

function updateOrientationLabel() {
  const label = document.getElementById('orientation-label');
  if (label) {
    label.textContent = state.isVertical ? 'Vertical' : 'Horizontal';
  }
}

/* Placement Handlers */

function handlePlacement(action, row, col) {
  if (state.phase !== PHASES.PLACEMENT) return;
  if (state.currentShipIdx >= SHIP_LENGTHS.length) return;

  if (action === 'clear') {
    DOMController.clearPlacementPreview();
    return;
  }

  const length = SHIP_LENGTHS[state.currentShipIdx];
  const valid = state.human.gameboard.isValidPlacement(length, row, col, state.isVertical);

  if (action === 'preview') {
    DOMController.renderPlacementPreview(
      state.human.gameboard, row, col, length, state.isVertical, valid
    );
    return;
  }

  if (action === 'place') {
    if (!valid) {
      SoundManager.playMiss();
      DOMController.updateMessage('Cannot place there! Try a different cell or orientation.');
      return;
    }

    state.human.gameboard.placeShip(length, row, col, state.isVertical);
    SoundManager.playPlace();
    DOMController.renderBoard(DOMController.playerBoardEl, state.human.gameboard, false);
    DOMController.clearPlacementPreview();
    DOMController.renderFleetHealth(state.human.gameboard);
    DOMController.updateFleetStatus(state.human.gameboard.getRemainingShips());
    state.currentShipIdx++;

    if (state.currentShipIdx >= SHIP_LENGTHS.length) {
      DOMController.updateMessage('All ships placed! Click Start Battle to begin.');
    } else {
      DOMController.updateMessage(
        `Place your ${SHIP_NAMES[state.currentShipIdx]} (${SHIP_LENGTHS[state.currentShipIdx]} cells)`
      );
    }

    updatePlacementUI();
  }
}

/* Battle Handlers */

function handleAttack(row, col) {
  if (state.phase !== PHASES.BATTLE) return;

  const spot = state.computer.gameboard.board[row][col];
  if (spot === 'hit' || spot === 'miss') return;

  const isHit = state.human.attack(state.computer.gameboard, row, col);
  SoundManager.resume();

  if (isHit) {
    state.stats.hits++;
    SoundManager.playHit();
    DOMController.animateHit(DOMController.computerBoardEl, row, col);
  } else {
    state.stats.misses++;
    SoundManager.playMiss();
    DOMController.animateMiss(DOMController.computerBoardEl, row, col);
  }
  state.stats.turns++;
  DOMController.updateStats(state.stats.hits, state.stats.misses, state.stats.turns);

  setTimeout(() => {
    renderBoards(false);
    DOMController.renderFleetHealth(state.human.gameboard);

    if (state.computer.gameboard.allShipsSunk()) {
      endGame(true);
      return;
    }

    DOMController.updateMessage('Enemy is attacking...');
    DOMController.computerBoardEl.style.pointerEvents = 'none';

    setTimeout(() => {
      if (state.phase === PHASES.GAME_OVER) return;
      computerTurn();
    }, 700);
  }, 400);
}

function computerTurn() {
  if (state.phase !== PHASES.BATTLE) return;

  const result = state.computer.smartAttack(state.human.gameboard);
  SoundManager.resume();

  if (result === true) {
    SoundManager.playHit();
    const lastMove = findLastHit(state.human.gameboard);
    if (lastMove) DOMController.animateHit(DOMController.playerBoardEl, lastMove.row, lastMove.col);
  } else {
    SoundManager.playMiss();
    const lastMove = findLastMiss(state.human.gameboard);
    if (lastMove) DOMController.animateMiss(DOMController.playerBoardEl, lastMove.row, lastMove.col);
  }

  setTimeout(() => {
    renderBoards(false);
    DOMController.renderFleetHealth(state.human.gameboard);

    if (state.human.gameboard.allShipsSunk()) {
      endGame(false);
      return;
    }

    DOMController.computerBoardEl.style.pointerEvents = '';
    DOMController.updateMessage('Your turn! Attack the enemy waters.');
  }, 400);
}

function findLastHit(gameboard) {
  for (let r = 9; r >= 0; r--) {
    for (let c = 9; c >= 0; c--) {
      if (gameboard.board[r][c] === 'hit') return { row: r, col: c };
    }
  }
  return null;
}

function findLastMiss(gameboard) {
  const miss = gameboard.missedAttacks[gameboard.missedAttacks.length - 1];
  if (miss) return { row: miss[0], col: miss[1] };
  return null;
}

function endGame(won) {
  state.phase = PHASES.GAME_OVER;
  DOMController.computerBoardEl.style.pointerEvents = '';

  const message = won
    ? 'Victory! You destroyed the enemy fleet!'
    : 'Defeat! Your fleet has been destroyed!';

  DOMController.updateMessage(message);
  DOMController.showGameOver(DOMController.computerSectionEl);

  renderBoards(true);
  SoundManager.playGameOver(won);

  DOMController.renderFleetHealth(state.human.gameboard);
  const remaining = state.computer.gameboard.getRemainingShips();
  if (remaining > 0) {
    DOMController.updateFleetStatus(remaining);
  }
}

/* Event Bindings */

DOMController.bindAttackHandler(handleAttack);

DOMController.bindPlacementHandler(handlePlacement);

DOMController.bindOrientationHandler(() => {
  if (state.phase !== PHASES.PLACEMENT) return;
  state.isVertical = !state.isVertical;
  SoundManager.playClick();
  updateOrientationLabel();
  updatePlacementUI();
});

DOMController.bindRandomizeHandler(() => {
  if (state.phase !== PHASES.PLACEMENT) return;
  resetPlayerBoard();
  state.currentShipIdx = 0;
  randomizeBoard(state.human.gameboard);
  SoundManager.playPlace();
  renderBoards(false);
  DOMController.clearPlacementPreview();
  DOMController.renderFleetHealth(state.human.gameboard);
  DOMController.updateFleetStatus(state.human.gameboard.getRemainingShips());
  DOMController.updateMessage('Fleet randomized! Click Start Battle when ready.');
  // Mark all ships as placed since randomize places all 5
  state.currentShipIdx = SHIP_LENGTHS.length;
  updatePlacementUI();
});

DOMController.bindStartHandler(() => {
  if (state.phase !== PHASES.PLACEMENT) return;
  if (state.currentShipIdx < SHIP_LENGTHS.length) {
    DOMController.updateMessage('Place all your ships first!');
    return;
  }
  state.phase = PHASES.BATTLE;
  SoundManager.playClick();
  DOMController.setPlacementMode(false);
  DOMController.statsContainerEl.classList.remove('hidden');
  DOMController.updateMessage('Game Started! Your turn to attack.');
  DOMController.updateStats(state.stats.hits, state.stats.misses, state.stats.turns);
});

DOMController.bindRestartHandler(() => {
  SoundManager.playClick();
  initGame();
});

DOMController.bindSoundToggleHandler(() => {
  const enabled = SoundManager.toggle();
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.innerHTML = `<span class="btn-icon">${enabled ? '🔊' : '🔇'}</span>`;
  }
  SoundManager.playClick();
});

initGame();
