function Gameboard(gridSize) {
  const grid = [];
  for (let i = 0; i < gridSize; i += 1) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j += 1) {
      grid[i][j] = 0;
    }
  }

  const info = {
    hits: [],
    misses: [],
    ships: 0,
    grid,
  };

  const getRandomPos = () => [
    Math.floor(Math.random() * grid.length),
    Math.floor(Math.random() * grid.length),
  ];

  const getRandomAxis = () => Math.floor(Math.random() * 4);

  const isPlacementAvailable = (ship, pos, isHorizontal) => {
    const [x, y] = [pos[0], pos[1]];

    //  checks if ship exceeds x-axis or y-axis
    if (isHorizontal && x + ship.info.size > gridSize) return false;
    if (!isHorizontal && y + ship.info.size > gridSize) return false;

    // checks if current placement overlaps an already placed ship
    for (let i = 0; i < ship.info.size; i += 1) {
      if (isHorizontal && grid[x + i][y] !== 0) return false;
      if (!isHorizontal && grid[x][y + i] !== 0) return false;
    }
    return true;
  };

  const getValidPos = (ship, isHorizontal) => {
    let pos = getRandomPos();
    while (!isPlacementAvailable(ship, pos, isHorizontal)) {
      pos = getRandomPos();
    }
    return pos;
  };

  const placeShipAt = (ship, pos, isHorizontal) => {
    let x;
    let y;
    if (pos === undefined) {
      // eslint-disable-next-line no-param-reassign
      isHorizontal = getRandomAxis();
      const randomPos = getValidPos(ship, isHorizontal);
      [x, y] = [randomPos[0], randomPos[1]];
    } else {
      if (!isPlacementAvailable(ship, pos, isHorizontal)) return 'invalid';
      [x, y] = [pos[0], pos[1]];
    }
    const shipPosArr = [];

    for (let i = 0; i < ship.info.size; i += 1) {
      if (isHorizontal !== 0) {
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
    const [x, y] = [pos[0], pos[1]];
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
