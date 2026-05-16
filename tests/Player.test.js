import Player from '../src/modules/Player';
import Gameboard from '../src/modules/Gameboard';

describe('Player Factory/Class', () => {
  let humanPlayer;
  let computerPlayer;
  let enemyBoard;

  beforeEach(() => {
    humanPlayer = new Player('human');
    computerPlayer = new Player('computer');
    enemyBoard = new Gameboard();
  });

  test('Player has a Gameboard', () => {
    expect(humanPlayer.gameboard).toBeInstanceOf(Gameboard);
    expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
  });

  test('Human player attacks enemy board', () => {
    humanPlayer.attack(enemyBoard, 0, 0);
    expect(enemyBoard.board[0][0]).toBe('miss');
    expect(enemyBoard.missedAttacks).toContainEqual([0, 0]);
  });

  test('Computer player makes valid random attack', () => {
    computerPlayer.randomAttack(enemyBoard);
    // There should be exactly 1 miss on the enemy board since empty
    expect(enemyBoard.missedAttacks.length).toBe(1);
    const [row, col] = enemyBoard.missedAttacks[0];
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });

  test('Computer player does not attack same coordinate twice', () => {
    // Manually mark all except 1 spot as attacked
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        enemyBoard.board[r][c] = 'miss'; // Fill the board
      }
    }
    // Only leave 0,0 open
    enemyBoard.board[0][0] = null;
    
    computerPlayer.randomAttack(enemyBoard);
    expect(enemyBoard.board[0][0]).toBe('miss');
    
    // Now the board is completely full. Trying to attack should be handled
    // Or it throws, depending on implementation
    // We expect the computer to not freeze and maybe return false or handle it
    expect(computerPlayer.randomAttack(enemyBoard)).toBe(false);
  });
});
