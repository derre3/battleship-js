function Player(board) {
  // the functions below are used by the AI while playing turns to pick an available cell
  const getRandomPos = () => [
    Math.floor(Math.random() * board.info.grid.length),
    Math.floor(Math.random() * board.info.grid.length),
  ];
  const isAttackValid = (pos) => {
    const [x, y] = [pos[0], pos[1]];
    if (board.info.grid[x][y] === 1) return 'invalid';
    return 'valid';
  };
  const getValidPos = () => {
    let pos = getRandomPos();
    while (isAttackValid(pos) !== 'valid') {
      pos = getRandomPos();
    }
    return pos;
  };

  // if board coords is not provided it will search for a valid cell to attack
  const playTurn = (pos) => {
    if (!pos) {
      board.receiveAttack(getValidPos());
    } else {
      board.receiveAttack(pos);
    }
  };
  return { playTurn };
}

module.exports = { Player };
