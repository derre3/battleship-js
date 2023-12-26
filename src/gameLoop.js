const { Player } = require('./player');
const { Gameboard } = require('./gameboard');
const { Ship } = require('./ship');
const { boardModule } = require('./domStuff');
const { displayShips } = require('./domStuff');
const { updateBoard } = require('./domStuff');
const { displayEndResult } = require('./domStuff');
const { updateShipCounter } = require('./domStuff');

const main = document.querySelector('main');
function gameLoop() {
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  main.append(gameContainer);
  // query selectors
  const infoText = document.querySelectorAll('.info-text');
  const infoBox = document.querySelector('.info-box');
  // const playButton = document.querySelector('#play');
  // const replayButton = document.querySelector('#replay');
  // const rotateButton = document.querySelector('#rotate');
  const playButton = document.createElement('button');
  const replayButton = document.createElement('button');
  const rotateButton = document.createElement('button');
  playButton.textContent = 'Play!';
  replayButton.textContent = 'Play Again!';
  rotateButton.textContent = 'Horizontal';
  playButton.id = 'play';
  replayButton.id = 'replay';
  rotateButton.id = 'rotate';

  infoBox.append(playButton, replayButton, rotateButton);

  // create boards
  const boardSize = 10;
  const boardP1 = Gameboard(boardSize);
  const boardP2 = Gameboard(boardSize);
  const boardP1DOM = boardModule(boardSize, 'p1');
  const boardP2DOM = boardModule(boardSize, 'p2');

  infoText[0].textContent = 'Place your ships on the board!';
  infoText[1].textContent = 'Carrier awaiting coordinates.';
  playButton.classList.add('hidden');
  replayButton.classList.add('hidden');
  rotateButton.classList.remove('hidden');

  gameContainer.append(boardP1DOM.container);
  // gameContainer.append(boardP2DOM.container); // REMOVE AFTER DEBUG
  // create players
  const playerOne = Player(boardP2);
  const playerTwo = Player(boardP1);

  // place ships

  boardP2.placeShipAt(Ship(5));
  boardP2.placeShipAt(Ship(4));
  boardP2.placeShipAt(Ship(3));
  boardP2.placeShipAt(Ship(3));
  boardP2.placeShipAt(Ship(2));

  let shipPlacerCounter = 1;
  let rotateShip = 1;
  boardP1DOM.itemArr.forEach((column) => {
    column.forEach((item) => {
      item.addEventListener('click', () => {
        const x = boardP1DOM.itemArr.indexOf(column);
        const y = column.indexOf(item);

        if (shipPlacerCounter === 1) {
          const s5 = boardP1.placeShipAt(Ship(5), [x, y], rotateShip);
          if (s5 !== 'invalid') {
            displayShips(boardP1DOM.itemArr, s5);
            shipPlacerCounter += 1;
            infoText[1].textContent = 'Battleship awaiting coordinates.';
          }
        } else if (shipPlacerCounter === 2) {
          const s4 = boardP1.placeShipAt(Ship(4), [x, y], rotateShip);
          if (s4 !== 'invalid') {
            displayShips(boardP1DOM.itemArr, s4);
            shipPlacerCounter += 1;
            infoText[1].textContent = 'Destroyer awaiting coordinates.';
          }
        } else if (shipPlacerCounter === 3) {
          const s3 = boardP1.placeShipAt(Ship(3), [x, y], rotateShip);
          if (s3 !== 'invalid') {
            displayShips(boardP1DOM.itemArr, s3);
            shipPlacerCounter += 1;
            infoText[1].textContent = 'Submarine awaiting coordinates.';
          }
        } else if (shipPlacerCounter === 4) {
          const s3 = boardP1.placeShipAt(Ship(3), [x, y], rotateShip);
          if (s3 !== 'invalid') {
            displayShips(boardP1DOM.itemArr, s3);
            shipPlacerCounter += 1;
            infoText[1].textContent = 'Patrol Boat awaiting coordinates.';
          }
        } else if (shipPlacerCounter === 5) {
          const s3 = boardP1.placeShipAt(Ship(2), [x, y], rotateShip);
          if (s3 !== 'invalid') {
            displayShips(boardP1DOM.itemArr, s3);
            shipPlacerCounter += 1;
            infoText[0].textContent = 'Your ships are in position.';
            infoText[1].textContent = 'Press Play to start!';
            playButton.classList.remove('hidden');
            playButton.classList.remove('hidden');
            rotateButton.classList.add('hidden');
          }
        }
      });
    });
  });

  boardP2DOM.itemArr.forEach((column) => {
    column.forEach((item) => {
      item.addEventListener('click', () => {
        const x = boardP2DOM.itemArr.indexOf(column);
        const y = column.indexOf(item);
        // playerOne plays the round attacking boardP2
        playerOne.playTurn([x, y]);
        // board is updated in the DOM
        updateBoard(boardP2.info, boardP2DOM.itemArr);
        updateShipCounter(boardP2.info.ships);
        // check if all ships are destroyed on boardP2
        if (boardP2.info.ships === 0) {
          // if true return playerOne victory
          gameContainer.classList.add('unfocused');
          replayButton.classList.remove('hidden');
          displayEndResult(1);
          return;
        }
        // else playerTwo plays the round attacking boardP1
        playerTwo.playTurn();
        // board is updated in the DOM
        updateBoard(boardP1.info, boardP1DOM.itemArr);
        // check if all ships are destroyed on boardP1
        if (boardP1.info.ships === 0) {
          // if true return playerTwo victory
          gameContainer.classList.add('unfocused');
          replayButton.classList.remove('hidden');
          displayEndResult(2);
        }
      });
    });
  });

  playButton.addEventListener('click', () => {
    gameContainer.append(boardP2DOM.container);
    playButton.classList.add('hidden');
    boardP1DOM.container.classList.add('smaller');
    boardP1DOM.container.classList.add('unfocused');
    infoText[0].textContent = 'Destroy the opposing force ships!';
    updateShipCounter(boardP2.info.ships);
  });

  replayButton.addEventListener('click', () => {
    replayButton.classList.add('hidden');
    gameContainer.remove();
    return gameLoop();
  });

  rotateButton.addEventListener('click', () => {
    rotateButton.classList.toggle('clicked');
    if (rotateShip) rotateButton.textContent = 'Vertical';
    if (!rotateShip) rotateButton.textContent = 'Horizontal';
    rotateShip = rotateShip ? 0 : 1;
  });
}

gameLoop();
