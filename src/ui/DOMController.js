import SoundManager from './SoundManager';

class DOMController {
  constructor() {
    this.playerBoardEl = null;
    this.computerBoardEl = null;
    this.turnMessageEl = null;
    this.randomizeBtn = null;
    this.startBtn = null;
    this.restartBtn = null;
    this.orientationBtn = null;
    this.soundToggleBtn = null;
    this.computerSectionEl = null;
  }

  init() {
    this.playerBoardEl = document.getElementById('player-board');
    this.computerBoardEl = document.getElementById('computer-board');
    this.turnMessageEl = document.getElementById('turn-message');
    this.randomizeBtn = document.getElementById('randomize-btn');
    this.startBtn = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.orientationBtn = document.getElementById('orientation-btn');
    this.soundToggleBtn = document.getElementById('sound-toggle');
    this.computerSectionEl = document.querySelector('.computer-section');
    this.placementInfoEl = document.getElementById('placement-info');
    this.statsContainerEl = document.getElementById('stats-container');
    this.hitsEl = document.getElementById('stat-hits');
    this.missesEl = document.getElementById('stat-misses');
    this.turnsEl = document.getElementById('stat-turns');
    this.fleetHealthEl = document.getElementById('fleet-health');
    SoundManager.init();
  }

  renderBoard(boardEl, gameboard, isEnemy = false, revealShips = false) {
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
        } else if (spot !== null && isEnemy && revealShips) {
          cell.classList.add('ship');
        }

        boardEl.appendChild(cell);
      }
    }
  }

  renderPlacementPreview(gameboard, row, col, length, isVertical, isValid) {
    this.clearPlacementPreview();
    const cells = [];
    for (let i = 0; i < length; i++) {
      const r = isVertical ? row + i : row;
      const c = isVertical ? col : col + i;
      if (r >= 0 && r < 10 && c >= 0 && c < 10) {
        cells.push({ row: r, col: c });
      }
    }
    cells.forEach(({ row, col }) => {
      const cell = this.playerBoardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (cell) {
        cell.classList.add(isValid ? 'preview-valid' : 'preview-invalid');
      }
    });
  }

  clearPlacementPreview() {
    this.playerBoardEl.querySelectorAll('.preview-valid, .preview-invalid')
      .forEach(c => c.classList.remove('preview-valid', 'preview-invalid'));
  }

  updatePlacementInfo(currentIdx, totalShips, shipNames, isVertical) {
    if (!this.placementInfoEl) return;
    const remaining = totalShips - currentIdx;
    if (currentIdx >= totalShips) {
      this.placementInfoEl.innerHTML = `<span class="current-ship-label">All ships placed! Ready for battle.</span>`;
      return;
    }
    const name = shipNames[currentIdx] || `Ship ${currentIdx + 1}`;
    const length = [5, 4, 3, 3, 2][currentIdx];
    const dots = Array(length).fill(0).map(() => '<span class="ship-dot"></span>').join('');
    this.placementInfoEl.innerHTML = `
      <span class="current-ship-label">Placing: <strong>${name}</strong> (${length} cells)</span>
      <span class="ship-dots">${dots}</span>
      <span class="current-ship-label">${remaining} ship${remaining > 1 ? 's' : ''} left</span>
      <span class="current-ship-label">Orientation: <strong>${isVertical ? 'Vertical' : 'Horizontal'}</strong></span>
    `;
  }

  updateStats(hits, misses, turns) {
    if (this.hitsEl) this.hitsEl.textContent = hits;
    if (this.missesEl) this.missesEl.textContent = misses;
    if (this.turnsEl) this.turnsEl.textContent = turns;
  }

  renderFleetHealth(gameboard) {
    if (!this.fleetHealthEl) return;
    this.fleetHealthEl.innerHTML = '';
    gameboard.ships.forEach((ship, idx) => {
      const item = document.createElement('div');
      item.className = 'ship-health-item';
      const label = document.createElement('span');
      label.textContent = `${['CV', 'BB', 'CA', 'SS', 'DD'][idx] || idx + 1}`;
      const dots = document.createElement('span');
      dots.className = 'ship-dots';
      for (let i = 0; i < ship.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'health-dot';
        if (ship.isSunk()) {
          dot.classList.add('destroyed');
        } else if (i < ship.hits) {
          dot.classList.add('active');
        } else {
          dot.classList.add('active');
        }
        dots.appendChild(dot);
      }
      item.appendChild(label);
      item.appendChild(dots);
      this.fleetHealthEl.appendChild(item);
    });
  }

  getCell(boardEl, row, col) {
    return boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }

  animateHit(boardEl, row, col) {
    const cell = this.getCell(boardEl, row, col);
    if (!cell) return;
    cell.classList.add('hit', 'explosion');
    if (boardEl === this.playerBoardEl) {
      boardEl.closest('.board-section')?.classList.add('board-shake');
      setTimeout(() => {
        boardEl.closest('.board-section')?.classList.remove('board-shake');
      }, 500);
    }
  }

  animateMiss(boardEl, row, col) {
    const cell = this.getCell(boardEl, row, col);
    if (!cell) return;
    cell.classList.add('miss', 'splash');
  }

  animateSunk(boardEl, cells) {
    cells.forEach(({ row, col }) => {
      const cell = this.getCell(boardEl, row, col);
      if (cell) cell.classList.add('sunk');
    });
  }

  updateMessage(msg) {
    if (this.turnMessageEl) this.turnMessageEl.textContent = msg;
  }

  showGameOver(computerSectionEl) {
    computerSectionEl.classList.add('game-over');
    this.restartBtn.classList.remove('hidden');
    this.randomizeBtn.classList.add('hidden');
    this.startBtn.classList.add('hidden');
    if (this.orientationBtn) this.orientationBtn.classList.add('hidden');
  }

  setPlacementMode(active) {
    if (this.orientationBtn) {
      this.orientationBtn.classList.toggle('hidden', !active);
    }
    if (this.randomizeBtn) {
      this.randomizeBtn.classList.toggle('hidden', !active);
    }
    if (this.startBtn) {
      this.startBtn.classList.toggle('hidden', !active);
    }
    if (this.placementInfoEl) {
      this.placementInfoEl.classList.toggle('hidden', !active);
    }
  }

  bindOrientationHandler(handler) {
    if (this.orientationBtn) {
      this.orientationBtn.addEventListener('click', handler);
    }
  }

  bindAttackHandler(handler) {
    this.computerBoardEl.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      handler(row, col);
    });
  }

  bindPlacementHandler(handler) {
    this.playerBoardEl.addEventListener('mouseover', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      handler('preview', parseInt(cell.dataset.row), parseInt(cell.dataset.col));
    });

    this.playerBoardEl.addEventListener('mouseleave', () => {
      handler('clear');
    });

    this.playerBoardEl.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      handler('place', parseInt(cell.dataset.row), parseInt(cell.dataset.col));
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

  bindSoundToggleHandler(handler) {
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', handler);
    }
  }
}

export default new DOMController();
