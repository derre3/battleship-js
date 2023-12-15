const { Ship } = require('../ship');

test('ship size 3', () => {
  const ship = Ship(3);
  expect(Ship(3).info).toEqual({
    size: 3,
    hitCount: 0,
    sunk: false,
  });
});

test('ship size 3 hit once', () => {
  const ship = Ship(3);
  ship.hit();
  expect(ship.info).toEqual({
    size: 3,
    hitCount: 1,
    sunk: false,
  });
});

test('ship size 3 hit twice', () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  expect(ship.info).toEqual({
    size: 3,
    hitCount: 2,
    sunk: false,
  });
});

test('ship size 3 hit thrice and sunk', () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.info).toEqual({
    size: 3,
    hitCount: 3,
    sunk: true,
  });
});
