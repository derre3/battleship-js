const { Player } = require('../player');
const { Gameboard } = require('../gameboard');

test('players taking turns', () => {
  const boardP1 = Gameboard(8);
  const boardP2 = Gameboard(8);
  const playerOne = Player(boardP2);
  const playerTwo = Player(boardP1);
  playerOne.playTurn([0, 0]);
  playerTwo.playTurn([3, 3]);
  expect(boardP1.info.grid[3][3]).toBe(1);
  expect(boardP2.info.grid[0][0]).toBe(1);
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
