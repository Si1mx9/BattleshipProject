import Ship from './Ship';

class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.missedAttacks = [];
    this.ships = [];
  }

  placeShip(length, row, col, isVertical) {
    if (row < 0 || col < 0 || row >= 10 || col >= 10) {
      throw new Error('Out of bounds');
    }
    if (isVertical) {
      if (row + length > 10) throw new Error('Out of bounds');
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] !== null) throw new Error('Overlap');
      }
    } else {
      if (col + length > 10) throw new Error('Out of bounds');
      for (let i = 0; i < length; i++) {
        if (this.board[row][col + i] !== null) throw new Error('Overlap');
      }
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    for (let i = 0; i < length; i++) {
      if (isVertical) {
        this.board[row + i][col] = ship;
      } else {
        this.board[row][col + i] = ship;
      }
    }
  }

  isValidPlacement(length, row, col, isVertical) {
    if (row < 0 || col < 0 || row >= 10 || col >= 10) return false;
    if (isVertical) {
      if (row + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row + i][col] !== null) return false;
      }
    } else {
      if (col + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[row][col + i] !== null) return false;
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    if (row < 0 || col < 0 || row >= 10 || col >= 10) {
      throw new Error('Out of bounds');
    }

    const target = this.board[row][col];

    if (target === 'hit' || target === 'miss') {
      return false;
    }

    if (target instanceof Ship) {
      target.hit();
      this.board[row][col] = 'hit';
      return true;
    }

    this.board[row][col] = 'miss';
    this.missedAttacks.push([row, col]);
    return false;
  }

  getShipCells(ship) {
    const cells = [];
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (this.board[r][c] === ship) cells.push({ row: r, col: c });
      }
    }
    return cells;
  }

  getNeighborCells(row, col) {
    const neighbors = [];
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dr, dc] of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < 10 && nc >= 0 && nc < 10) {
        const spot = this.board[nr][nc];
        if (spot !== 'hit' && spot !== 'miss') {
          neighbors.push({ row: nr, col: nc });
        }
      }
    }
    return neighbors;
  }

  allShipsSunk() {
    if (this.ships.length === 0) return true;
    return this.ships.every(ship => ship.isSunk());
  }

  getRemainingShips() {
    return this.ships.filter(ship => !ship.isSunk()).length;
  }
}

export default Gameboard;
