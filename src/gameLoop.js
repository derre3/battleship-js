const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');
const { boardModule } = require('./domStuff');
const { displayShips } = require('./domStuff');
const { updateBoard } = require('./domStuff');

// create boards
const boardSize = 10;
const boardP1 = Gameboard(boardSize);
const boardP2 = Gameboard(boardSize);
const boardP1DOM = boardModule(boardSize, 'p1');
const boardP2DOM = boardModule(boardSize, 'p2');

const gameContainer = document.querySelector('.game-container');
gameContainer.append(boardP1DOM.container);
gameContainer.append(boardP2DOM.container);
// create players
const playerOne = Player(boardP2);
const playerTwo = Player(boardP1);
// place ships
displayShips(boardP1DOM.itemArr, boardP1.placeShipAt(Ship(5), [3, 8]));
displayShips(boardP1DOM.itemArr, boardP1.placeShipAt(Ship(4), [0, 5], true));
displayShips(boardP1DOM.itemArr, boardP1.placeShipAt(Ship(3), [7, 0]));
displayShips(boardP1DOM.itemArr, boardP1.placeShipAt(Ship(3), [3, 4]));
displayShips(boardP1DOM.itemArr, boardP1.placeShipAt(Ship(2), [3, 0], true));

boardP2.placeShipAt(Ship(5), [3, 8]);
boardP2.placeShipAt(Ship(4), [0, 5], true);
boardP2.placeShipAt(Ship(3), [7, 0]);
boardP2.placeShipAt(Ship(3), [3, 4]);
boardP2.placeShipAt(Ship(2), [3, 0], true);

boardP2DOM.itemArr.forEach((column) => {
  column.forEach((item) => {
    item.addEventListener('click', () => {
      const x = boardP2DOM.itemArr.indexOf(column);
      const y = column.indexOf(item);
      // playerOne plays the round attacking boardP2
      playerOne.playTurn([x, y]);
      // board is updated in the DOM
      updateBoard(boardP2.info, boardP2DOM.itemArr);
      // check if all ships are destroyed on boardP2
      if (boardP2.info.ships === 0) {
        // if true return playerOne victory
        alert('Player One Wins');
      }
      // else playerTwo plays the round attacking boardP1
      playerTwo.playTurn();
      // board is updated in the DOM
      updateBoard(boardP1.info, boardP1DOM.itemArr);
      // check if all ships are destroyed on boardP1
      if (boardP1.info.ships === 0) {
        // if true return playerTwo victory
        alert('Player Two Wins');
      }
    });
  });
});
