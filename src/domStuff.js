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
      //   boardItem.textContent = `${i},${j}`;
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

module.exports = { boardModule, displayShips };
