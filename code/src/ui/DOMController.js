class DOMController {
  constructor() {
    this.playerBoardEl = null;
    this.computerBoardEl = null;
    this.turnMessageEl = null;
    this.randomizeBtn = null;
    this.startBtn = null;
    this.restartBtn = null;
  }

  init() {
    this.playerBoardEl = document.getElementById('player-board');
    this.computerBoardEl = document.getElementById('computer-board');
    this.turnMessageEl = document.getElementById('turn-message');
    this.randomizeBtn = document.getElementById('randomize-btn');
    this.startBtn = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.fleetCountEl = document.querySelector('.fleet-count');
  }

  updateFleetStatus(count) {
    const fleetCountEl = document.querySelector('.fleet-count');
    if (fleetCountEl) {
      fleetCountEl.textContent = `${count} ship${count !== 1 ? 's' : ''}`;
    }
  }

  renderBoard(boardEl, gameboard, isEnemy = false) {
    boardEl.innerHTML = '';
    
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = r;
        cell.dataset.col = c;
        
        const spot = gameboard.board[r][c];
        
        if (spot === 'hit') {
          cell.classList.add('hit');
        } else if (spot === 'miss') {
          cell.classList.add('miss');
        } else if (spot !== null && !isEnemy) {
          cell.classList.add('ship');
        }

        boardEl.appendChild(cell);
      }
    }
  }

  updateMessage(msg) {
    this.turnMessageEl.textContent = msg;
  }

  showGameOver(computerSectionEl) {
    computerSectionEl.classList.add('game-over');
    this.restartBtn.classList.remove('hidden');
    this.randomizeBtn.classList.add('hidden');
    this.startBtn.classList.add('hidden');
  }

  bindAttackHandler(handler) {
    this.computerBoardEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        handler(row, col);
      }
    });
  }

  bindRandomizeHandler(handler) {
    this.randomizeBtn.addEventListener('click', handler);
  }

  bindStartHandler(handler) {
    this.startBtn.addEventListener('click', handler);
  }

  bindRestartHandler(handler) {
    this.restartBtn.addEventListener('click', handler);
  }
}

export default new DOMController();
