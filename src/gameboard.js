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
    ships: 0,
    grid,
  };

  const isPlacementAvailable = (ship, pos, isVertical) => {
    const x = pos[0];
    const y = pos[1];

    //  checks if ship exceeds x-axis or y-axis
    if (!isVertical && x + ship.info.size > gridSize) return false;
    if (isVertical && y + ship.info.size > gridSize) return false;

    // checks if current placement overlaps an already placed ship
    for (let i = 0; i < ship.info.size; i++) {
      if (!isVertical && grid[x + i][y] !== 0) return false;
      if (isVertical && grid[x][y + i] !== 0) return false;
    }
    return true;
  };

  const placeShipAt = (ship, pos, isVertical = false) => {
    if (!isPlacementAvailable(ship, pos, isVertical)) return 'invalid';
    const x = pos[0];
    const y = pos[1];
    const shipPosArr = [];

    for (let i = 0; i < ship.info.size; i++) {
      if (!isVertical) {
        grid[x + i][y] = ship;
        shipPosArr.push([x + i, y]);
      } else {
        grid[x][y + i] = ship;
        shipPosArr.push([x, y + i]);
      }
    }
    info.ships += 1;
    return shipPosArr;
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
      if (grid[x][y].info.sunk === true) info.ships -= 1;
      grid[x][y] = 1;
    } else throw new Error('invalid-target');
  };

  return { info, placeShipAt, receiveAttack };
}

module.exports = {
  Gameboard,
};
