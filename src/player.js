// Players can take turns playing the game by attacking the enemy Gameboard.
// The game is played against the computer, so make the ‘computer’ capable of making random plays. The AI does not have to be smart,
// but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).
function Player(board) {
  const getRandomPos = () => [
    Math.floor(Math.random() * board.info.grid.length),
    Math.floor(Math.random() * board.info.grid.length),
  ];

  const checkAvailability = (pos) => {
    const x = pos[0];
    const y = pos[1];
    if (board.info.grid[x][y] === 1) return 'invalid';
    return 'valid';
  };

  const attackValidPos = () => {
    let validPos = getRandomPos();
    while (checkAvailability(validPos) !== 'valid') {
      validPos = getRandomPos();
    }
    board.receiveAttack(validPos);
  };

  let isPlayerOneTurn = true;

  const checkTurn = () => {
    if (isPlayerOneTurn) return 1;
    return 2;
  };

  const playTurn = (pos) => {
    if (checkTurn() === 1) {
      if (pos) board.receiveAttack(pos);
      if (!pos) attackValidPos();
      isPlayerOneTurn = false;
    } else {
      attackValidPos();
      isPlayerOneTurn = true;
    }
  };
  return { checkTurn, playTurn };
}

module.exports = { Player };
