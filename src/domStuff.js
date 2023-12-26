function boardModule(size, player) {
  const itemArr = [];
  const container = document.createElement('div');
  container.id = player;
  container.classList.add('board-container');

  for (let i = 0; i < size; i += 1) {
    const boardColumn = document.createElement('div');
    boardColumn.classList.add('board-column');
    container.append(boardColumn);
    itemArr[i] = [];
    for (let j = 0; j < size; j += 1) {
      const boardItem = document.createElement('div');
      boardItem.classList.add('board-item');
      boardColumn.append(boardItem);
      itemArr[i][j] = boardItem;
    }
  }
  return { container, itemArr };
}

function displayShips(itemArr, shipArr) {
  shipArr.forEach((ship) => {
    const [x, y] = [ship[0], ship[1]];
    itemArr[x][y].classList.add('ship');
  });
}

// this should execute after every player attack
function updateBoard(boardInfo, itemArr) {
  if (boardInfo.misses.length > 0) {
    const lastMiss = boardInfo.misses[boardInfo.misses.length - 1];
    const x = lastMiss[0];
    const y = lastMiss[1];
    itemArr[x][y].classList.add('miss');
  }
  if (boardInfo.hits.length > 0) {
    const lastHit = boardInfo.hits[boardInfo.hits.length - 1];
    const x = lastHit[0];
    const y = lastHit[1];
    itemArr[x][y].classList.add('hit');
  }
}

function displayEndResult(winner) {
  const infoText = document.querySelectorAll('.info-text');

  if (winner === 1) {
    infoText[0].textContent = 'You destroyed the opposing force ships!';
    infoText[1].textContent = 'Congratulations!';
  } else {
    infoText[0].textContent = 'All your ships are destroyed!';
    infoText[1].textContent = 'You lose';
  }
}

function updateShipCounter(ships) {
  const infoText = document.querySelectorAll('.info-text');
  infoText[1].textContent = `${ships} ships remaining`;
}

module.exports = {
  boardModule,
  displayShips,
  updateBoard,
  displayEndResult,
  updateShipCounter,
};
