import DOMController from '../src/ui/DOMController';
import Gameboard from '../src/modules/Gameboard';

describe('DOMController', () => {
  let mockPlayerBoardEl;
  let mockComputerBoardEl;
  let mockTurnMessageEl;
  let mockRandomizeBtn;
  let mockStartBtn;
  let mockRestartBtn;
  let mockComputerSectionEl;

  beforeEach(() => {
    mockPlayerBoardEl = document.createElement('div');
    mockPlayerBoardEl.id = 'player-board';
    
    mockComputerBoardEl = document.createElement('div');
    mockComputerBoardEl.id = 'computer-board';
    
    mockTurnMessageEl = document.createElement('div');
    mockTurnMessageEl.id = 'turn-message';
    
    mockRandomizeBtn = document.createElement('button');
    mockRandomizeBtn.id = 'randomize-btn';
    
    mockStartBtn = document.createElement('button');
    mockStartBtn.id = 'start-btn';
    
    mockRestartBtn = document.createElement('button');
    mockRestartBtn.id = 'restart-btn';

    mockComputerSectionEl = document.createElement('div');
    mockComputerSectionEl.classList.add('computer-section');

    document.body.appendChild(mockPlayerBoardEl);
    document.body.appendChild(mockComputerBoardEl);
    document.body.appendChild(mockTurnMessageEl);
    document.body.appendChild(mockRandomizeBtn);
    document.body.appendChild(mockStartBtn);
    document.body.appendChild(mockRestartBtn);
    document.body.appendChild(mockComputerSectionEl);

    DOMController.init();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renderBoard creates 100 cells', () => {
    const gameboard = new Gameboard();
    DOMController.renderBoard(mockPlayerBoardEl, gameboard, false);
    expect(mockPlayerBoardEl.children.length).toBe(100);
  });

  test('renderBoard adds ship class for ships', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 0, 0, false);
    DOMController.renderBoard(mockPlayerBoardEl, gameboard, false);
    
    expect(mockPlayerBoardEl.children[0].classList.contains('ship')).toBe(true);
    expect(mockPlayerBoardEl.children[1].classList.contains('ship')).toBe(true);
    expect(mockPlayerBoardEl.children[2].classList.contains('ship')).toBe(true);
  });

  test('renderBoard adds hit class for hits', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 0, 0, false);
    gameboard.receiveAttack(0, 0);
    
    DOMController.renderBoard(mockPlayerBoardEl, gameboard, false);
    expect(mockPlayerBoardEl.children[0].classList.contains('hit')).toBe(true);
  });

  test('renderBoard adds miss class for misses', () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(0, 0);
    
    DOMController.renderBoard(mockPlayerBoardEl, gameboard, false);
    expect(mockPlayerBoardEl.children[0].classList.contains('miss')).toBe(true);
  });

  test('renderBoard hides computer ships when isEnemy is true', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 0, 0, false);
    
    DOMController.renderBoard(mockComputerBoardEl, gameboard, true);
    expect(mockComputerBoardEl.children[0].classList.contains('ship')).toBe(false);
  });

  test('updateMessage updates turn message text', () => {
    DOMController.updateMessage('Test message');
    expect(mockTurnMessageEl.textContent).toBe('Test message');
  });

  test('showGameOver adds game-over class and toggles buttons', () => {
    DOMController.showGameOver(mockComputerSectionEl);
    
    expect(mockComputerSectionEl.classList.contains('game-over')).toBe(true);
    expect(mockRestartBtn.classList.contains('hidden')).toBe(false);
    expect(mockRandomizeBtn.classList.contains('hidden')).toBe(true);
    expect(mockStartBtn.classList.contains('hidden')).toBe(true);
  });

  test('bindAttackHandler calls handler with correct coordinates', () => {
    const gameboard = new Gameboard();
    DOMController.renderBoard(mockComputerBoardEl, gameboard, true);
    
    const handler = jest.fn();
    DOMController.bindAttackHandler(handler);
    
    const cell = mockComputerBoardEl.children[0];
    cell.setAttribute('data-row', '3');
    cell.setAttribute('data-col', '7');
    cell.click();
    
    expect(handler).toHaveBeenCalledWith(3, 7);
  });

  test('bindRandomizeHandler calls handler on click', () => {
    const handler = jest.fn();
    DOMController.bindRandomizeHandler(handler);
    
    mockRandomizeBtn.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('bindStartHandler calls handler on click', () => {
    const handler = jest.fn();
    DOMController.bindStartHandler(handler);
    
    mockStartBtn.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('bindRestartHandler calls handler on click', () => {
    const handler = jest.fn();
    DOMController.bindRestartHandler(handler);
    
    mockRestartBtn.click();
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
