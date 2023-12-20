/* eslint-disable no-plusplus */
function Gameboard(gridSize) {
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    }
  }

  const info = {
    hits: [],
    misses: [],
    ships: [],
    grid,
  };

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
    info.ships.push(true);
  };

  // Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
  // Gameboards should keep track of missed attacks so they can display them properly.
  // Gameboards should be able to report whether or not all of their ships have been sunk.
  const receiveAttack = (pos) => {
    const x = pos[0];
    const y = pos[1];
    if (grid[x][y] === 0) {
      info.misses.push([x, y]);
      grid[x][y] = 1;
    } else if (grid[x][y] !== 1 && grid[x][y] !== 0) {
      grid[x][y].hit();
      info.hits.push([x, y]);
      if (grid[x][y].info.sunk === true) info.ships.pop();
      grid[x][y] = 1;
    } else throw new Error('invalid-target');
  };

  return { info, placeShipAt, receiveAttack };
}

module.exports = {
  Gameboard,
};
