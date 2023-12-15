// ships are objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
// isSunk evaluates the ship's size with the number of times it's been hit (if hits >= length = sunk)
function Ship(size) {
  const info = {
    size,
    hitCount: 0,
    sunk: false,
  };

  const isSunk = () => {
    if (info.hitCount >= info.size) info.sunk = true;
    else info.sunk = false;
  };

  const hit = () => {
    info.hitCount += 1;
    isSunk();
  };

  return {
    info,
    hit,
  };
}

module.exports = {
  Ship,
};
