import Gameboard from './Gameboard';

class Player {
  constructor(type = 'human') {
    this.type = type;
    this.gameboard = new Gameboard();
    this.targetStack = [];
  }

  attack(enemyGameboard, row, col) {
    if (this.type !== 'human') throw new Error('Computer should use smartAttack');
    return enemyGameboard.receiveAttack(row, col);
  }

  randomAttack(enemyGameboard) {
    if (this.type !== 'computer') throw new Error('Human should use attack');

    const availableMoves = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const spot = enemyGameboard.board[r][c];
        if (spot !== 'hit' && spot !== 'miss') {
          availableMoves.push({ row: r, col: c });
        }
      }
    }

    if (availableMoves.length === 0) return false;

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return enemyGameboard.receiveAttack(
      availableMoves[randomIndex].row,
      availableMoves[randomIndex].col
    );
  }

  smartAttack(enemyGameboard) {
    if (this.type !== 'computer') throw new Error('Human should use attack');

    let move = null;

    while (this.targetStack.length > 0) {
      const candidate = this.targetStack.pop();
      const spot = enemyGameboard.board[candidate.row][candidate.col];
      if (spot !== 'hit' && spot !== 'miss') {
        move = candidate;
        break;
      }
    }

    if (!move) {
      const parity = [];
      const fallback = [];
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          const spot = enemyGameboard.board[r][c];
          if (spot !== 'hit' && spot !== 'miss') {
            fallback.push({ row: r, col: c });
            if ((r + c) % 2 === 0) parity.push({ row: r, col: c });
          }
        }
      }
      const pool = parity.length > 0 ? parity : fallback;
      if (pool.length === 0) return false;
      move = pool[Math.floor(Math.random() * pool.length)];
    }

    const result = enemyGameboard.receiveAttack(move.row, move.col);

    if (result === true) {
      const neighbors = enemyGameboard.getNeighborCells(move.row, move.col);
      this.targetStack.push(...neighbors);
    }

    return result;
  }

  resetAI() {
    this.targetStack = [];
  }
}

export default Player;
