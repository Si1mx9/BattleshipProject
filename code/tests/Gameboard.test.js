import Gameboard from '../src/modules/Gameboard';
import Ship from '../src/modules/Ship';

describe('Gameboard Factory/Class', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Gameboard is initialized with a 10x10 board', () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  test('placeShip sets ship horizontally', () => {
    gameboard.placeShip(3, 0, 0, false);
    // Directly accessing board for testing purposes, assuming ship is an object reference
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][1]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][2]).toBeInstanceOf(Ship);
    expect(gameboard.board[0][3]).toBeNull();
  });

  test('placeShip sets ship vertically', () => {
    gameboard.placeShip(3, 0, 0, true);
    expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[1][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[2][0]).toBeInstanceOf(Ship);
    expect(gameboard.board[3][0]).toBeNull();
  });

  test('placeShip throws error if out of bounds (horizontal)', () => {
    expect(() => gameboard.placeShip(3, 0, 8, false)).toThrow('Out of bounds');
  });

  test('placeShip throws error if out of bounds (vertical)', () => {
    expect(() => gameboard.placeShip(3, 8, 0, true)).toThrow('Out of bounds');
  });

  test('receiveAttack records missed shot', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toContainEqual([0, 0]);
    expect(gameboard.board[0][0]).toBe('miss');
  });

  test('receiveAttack hits a ship', () => {
    gameboard.placeShip(3, 0, 0, false);
    const ship = gameboard.board[0][0];
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
    expect(gameboard.board[0][0]).toBe('hit');
    expect(gameboard.missedAttacks).not.toContainEqual([0, 0]);
  });

  test('receiveAttack hits same spot twice or already hit spot does nothing or returns false', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.receiveAttack(0, 0)).toBe(false); // Can be implemented to return false if already hit
  });

  test('allShipsSunk returns false if ships are remaining', () => {
    gameboard.placeShip(3, 0, 0, false);
    gameboard.placeShip(2, 2, 2, true);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test('allShipsSunk returns true when all ships sunk', () => {
    gameboard.placeShip(2, 0, 0, false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('allShipsSunk returns true when board is empty', () => {
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
