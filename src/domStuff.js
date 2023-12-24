/* eslint-disable no-plusplus */

function boardModule(size, player) {
  const itemArr = [];
  const container = document.createElement('div');
  container.id = player;
  container.classList.add('board-container');

  for (let i = 0; i < size; i++) {
    const boardColumn = document.createElement('div');
    boardColumn.classList.add('board-column');
    container.append(boardColumn);
    itemArr[i] = [];
    for (let j = 0; j < size; j++) {
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
    const x = ship[0];
    const y = ship[1];
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

module.exports = { boardModule, displayShips, updateBoard };
