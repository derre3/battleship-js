const { Player } = require('../player');
const { Gameboard } = require('../gameboard');

test('player 1 and player 2 (AI controlled) taking turns', () => {
  const board = Gameboard(8);
  const playerObj = Player(board);
  expect(playerObj.checkTurn()).toBe(1);
  playerObj.playTurn([3, 3]);
  expect(playerObj.checkTurn()).toBe(2);
  playerObj.playTurn();
  expect(playerObj.checkTurn()).toBe(1);
});

test('AI always pick an available move', () => {
  const board = Gameboard(2);
  const playerObj = Player(board);
  playerObj.playTurn();
  playerObj.playTurn();
  playerObj.playTurn();
  playerObj.playTurn();
  expect(board.info.grid[0][0]).toBe(1);
  expect(board.info.grid[0][1]).toBe(1);
  expect(board.info.grid[1][0]).toBe(1);
  expect(board.info.grid[1][1]).toBe(1);
});
