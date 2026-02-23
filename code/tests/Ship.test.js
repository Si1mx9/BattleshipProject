import Ship from '../src/modules/Ship';

describe('Ship Factory/Class', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('Ship has correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('Ship tracking hits correctly', () => {
    expect(ship.hits).toBe(0);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('Ship is not sunk initially', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('Ship sinks when hits equal length', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
