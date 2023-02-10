const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    { name: '', symbol: 'X' },
    { name: '', symbol: 'O' },
];

const playerConfigOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');

const formElement = document.querySelector('form');
const errorParagraphForm = document.getElementById('config-error');

const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');

const cancelConfigButton = document.getElementById('cancel-config-btn');

const startNewGameElement = document.getElementById('start-new-game');
const activeGameAreaElement = document.getElementById('active-game');
const gameBoardElements = document.querySelectorAll('#game-board li');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');




editPlayer1BtnElement.addEventListener('click' , playerEdit);
editPlayer2BtnElement.addEventListener('click' , playerEdit);

cancelConfigButton.addEventListener('click' , closePlayerConfig);
backdropElement.addEventListener('click' , closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startNewGameElement.addEventListener('click' , startNewGamePage);

for (const gameBoardElement of gameBoardElements) {      // for selecting every List items
    gameBoardElement.addEventListener('click' , selectGameBoard);
}
