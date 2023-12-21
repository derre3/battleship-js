function Player(board) {
  // the functions below are used by the AI while playing turns to pick an available cell
  const getRandomPos = () => [
    Math.floor(Math.random() * board.info.grid.length),
    Math.floor(Math.random() * board.info.grid.length),
  ];
  const isAttackValid = (pos) => {
    const x = pos[0];
    const y = pos[1];
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

  let isPlayerOneTurn = true;

  const checkTurn = () => {
    if (isPlayerOneTurn) return 1;
    return 2;
  };
  // player 1 is human controlled but can be controlled as AI if no board coords (pos) is passed
  // player 2 is the opposite and the same concept applies
  const playTurn = (pos) => {
    if (!pos || checkTurn() === 2) {
      board.receiveAttack(getValidPos());
    } else {
      board.receiveAttack(pos);
    }
    isPlayerOneTurn = !isPlayerOneTurn;
  };
  return { checkTurn, playTurn };
}

module.exports = { Player };
