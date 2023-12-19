/* eslint-disable no-plusplus */
function Gameboard(gridSize) {
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    }
  }

  //   there needs to be a limit to the X and Y axis
  // if (pos + shipSize) > boardSize place at (+edge - shipSize)
  // if (pos - shipSize) < 0 place at (-edge)
  // else place at pos
  // loop from 0 to shipSize and traverse the array placing the ship in each slot
  const placeShipAt = (ship, pos, isVertical = false) => {
    let x = pos[0];
    let y = pos[1];
    if (!isVertical && x + ship.info.size > gridSize) {
      x = gridSize - ship.info.size;
    }
    if (isVertical && y + ship.info.size > gridSize) {
      y = gridSize - ship.info.size;
    }
    for (let i = 0; i < ship.info.size; i++) {
      if (!isVertical) {
        grid[x + i][y] = ship;
      } else grid[x][y + i] = ship;
    }
  };

  return { grid, placeShipAt };
}

module.exports = {
  Gameboard,
};
