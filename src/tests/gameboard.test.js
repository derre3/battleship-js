const { Gameboard } = require('../gameboard');
const { Ship } = require('../ship');

test('board size = 8x8', () => {
  expect(Gameboard(8).info.grid[0].length).toBe(8);
  expect(Gameboard(8).info.grid[7].length).toBe(8);
});

test('place ship at coords [5,2]', () => {
  const board = Gameboard(8);
  const ship = Ship(1);
  board.placeShipAt(ship, [5, 2]);
  expect(board.info.grid[5][2]).toBe(ship);
});

test('place ship size 3 at coords [3,3]', () => {
  const board = Gameboard(8);
  const ship = Ship(3);
  board.placeShipAt(ship, [3, 3]);
  expect(board.info.grid[3][3]).toBe(ship);
  expect(board.info.grid[4][3]).toBe(ship);
  expect(board.info.grid[5][3]).toBe(ship);
});

test('place vertical ship size 3 at coords [3,3]', () => {
  const board = Gameboard(8);
  const ship = Ship(3);
  board.placeShipAt(ship, [3, 3], true);
  expect(board.info.grid[3][3]).toBe(ship);
  expect(board.info.grid[3][4]).toBe(ship);
  expect(board.info.grid[3][5]).toBe(ship);
});

test('place ship size 4 at grid edge [7,3]', () => {
  const board = Gameboard(8);
  const ship = Ship(4);
  expect(board.placeShipAt(ship, [7, 3])).toBe('invalid');
  expect(board.info.grid[7][3]).toBe(0);
});

test('place vertical ship size 5 at grid edge [3,7]', () => {
  const board = Gameboard(8);
  const ship = Ship(5);
  expect(board.placeShipAt(ship, [3, 7], true)).toBe('invalid');
  expect(board.info.grid[3][7]).toBe(0);
});

test('receive attack in empty space', () => {
  const board = Gameboard(8);
  board.receiveAttack([3, 3]);
  board.receiveAttack([4, 3]);
  expect(board.info.grid[3][3]).toBe(1);
  expect(board.info.grid[4][3]).toBe(1);
  expect(board.info.misses[0]).toEqual([3, 3]);
  expect(board.info.misses[1]).toEqual([4, 3]);
});

test('receive attack in populated space', () => {
  const board = Gameboard(8);
  const ship = Ship(3);
  board.placeShipAt(ship, [3, 3]);
  board.receiveAttack([3, 3]);
  board.receiveAttack([4, 3]);
  expect(board.info.grid[3][3]).toBe(1);
  expect(board.info.grid[4][3]).toBe(1);
  expect(board.info.grid[5][3].info.hitCount).toBe(2);
});

test('sink all ships', () => {
  const board = Gameboard(8);
  const ship = Ship(1);
  board.placeShipAt(ship, [3, 3]);
  board.placeShipAt(ship, [7, 3]);
  board.receiveAttack([3, 3]);
  board.receiveAttack([7, 3]);
  expect(board.info.ships.length).toBe(0);
  expect(board.info.hits[0]).toEqual([3, 3]);
  expect(board.info.hits[1]).toEqual([7, 3]);
});

test('do not overwrite ship position while placing it on the board', () => {
  const board = Gameboard(8);
  const ship1 = Ship(1);
  const ship2 = Ship(3);
  board.placeShipAt(ship1, [2, 0]);
  board.placeShipAt(ship2, [0, 0]);
  expect(board.info.grid[0][0]).toBe(0);
  expect(board.info.grid[1][0]).toBe(0);
  expect(board.info.grid[2][0]).toBe(ship1);
});
