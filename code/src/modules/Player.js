import Gameboard from './Gameboard';

class Player {
  constructor(type = 'human') {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  attack(enemyGameboard, row, col) {
    if (this.type !== 'human') throw new Error('Computer should use randomAttack');
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
    const move = availableMoves[randomIndex];

    return enemyGameboard.receiveAttack(move.row, move.col);
  }
}

export default Player;
