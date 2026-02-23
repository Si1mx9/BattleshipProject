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
      // optional: check overlapping
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

  receiveAttack(row, col) {
    if (row < 0 || col < 0 || row >= 10 || col >= 10) {
      throw new Error('Out of bounds');
    }
    
    const target = this.board[row][col];
    
    if (target === 'hit' || target === 'miss') {
      return false; // Already attacked
    }

    if (target instanceof Ship) {
      target.hit();
      this.board[row][col] = 'hit';
      return true; // Hit successful
    }

    this.board[row][col] = 'miss';
    this.missedAttacks.push([row, col]);
    return false; // Miss
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
