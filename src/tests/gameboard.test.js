const { Gameboard } = require('../gameboard');

test('board size = 8x8', () => {
  expect(Gameboard(8).grid[0].length).toBe(8);
  expect(Gameboard(8).grid[7].length).toBe(8);
});

test('place ship at coords [5,2]', () => {
  const board = Gameboard(8);
  const ship = {
    info: {
      size: 1,
    },
  };
  board.placeShipAt(ship, [5, 2]);
  expect(board.grid[5][2]).toBe(ship);
});

test('place ship size 3 at coords [3,3]', () => {
  const board = Gameboard(8);
  const ship = {
    info: {
      size: 3,
    },
  };
  board.placeShipAt(ship, [3, 3]);
  expect(board.grid[3][3]).toBe(ship);
  expect(board.grid[4][3]).toBe(ship);
  expect(board.grid[5][3]).toBe(ship);
});

test('place vertical ship size 3 at coords [3,3]', () => {
  const board = Gameboard(8);
  const ship = {
    info: {
      size: 3,
    },
  };
  board.placeShipAt(ship, [3, 3], true);
  expect(board.grid[3][3]).toBe(ship);
  expect(board.grid[3][4]).toBe(ship);
  expect(board.grid[3][5]).toBe(ship);
});

test('place ship size 4 at grid edge [7,3]', () => {
  const board = Gameboard(8);
  const ship = {
    info: {
      size: 4,
    },
  };
  board.placeShipAt(ship, [7, 3]);
  expect(board.grid[7][3]).toBe(ship);
  expect(board.grid[6][3]).toBe(ship);
  expect(board.grid[5][3]).toBe(ship);
  expect(board.grid[4][3]).toBe(ship);
});

test('place vertical ship size 5 at grid edge [3,7]', () => {
  const board = Gameboard(8);
  const ship = {
    info: {
      size: 5,
    },
  };
  board.placeShipAt(ship, [3, 7], true);
  expect(board.grid[3][7]).toBe(ship);
  expect(board.grid[3][6]).toBe(ship);
  expect(board.grid[3][5]).toBe(ship);
  expect(board.grid[3][4]).toBe(ship);
  expect(board.grid[3][3]).toBe(ship);
});
