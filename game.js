function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';
    
    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            const gameBoardItem = gameBoardElements[gameBoardIndex];
            gameBoardItem.textContent = '';
            gameBoardItem.classList.remove('disabled');
            gameBoardIndex++;
        }
    } 
}

function startNewGamePage(event) {
    if (players[0].name === '' || players[1].name === '') {
        alert('Please set custom player name!');
        return;
    }
    resetGameStatus();
    activePlayerNameElement.textContent = players[activePlayer].name;
    activeGameAreaElement.style.display = 'block';
}

function switchPlayer(event) {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameBoard (event) {
    if (event.target.tagName !== 'LI' || gameIsOver) {
        return;
    }
    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;
    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field');
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;

    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;

    switchPlayer();
}

function checkForGameOver (event) {
    // checking row for equality
    for (let i = 0; i < 3; i++) {
        if( gameData[i][0] > 0 && 
            gameData[i][0] === gameData[i][1] && 
            gameData[i][1] === gameData[i][2]) 
            {
            return gameData[i][0];
        }
    }
    // checking row for equality
    for (let i = 0; i < 3; i++) {
        if( gameData[0][i] > 0 && 
            gameData[0][i] === gameData[1][i] && 
            gameData[0][i] === gameData[2][i]) 
            {
            return gameData[0][i];
        }
    }
    // diagonal top left to bottom right
    if (gameData[0][0] > 0 && 
        gameData[0][0] === gameData[1][1] && 
        gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    // diagonal bottom left to top right
    if (gameData[2][0] > 0 && 
        gameData[2][0] === gameData[1][1] && 
        gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }
    // for draw
    if (currentRound === 9) {
        return -1
    }
    return 0;
}

function endGame(winnnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';
    if (winnnerId > 0) {
        const winnerName = players[winnnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = 'It\'s a DRAW!';
    }
}






// Alternative way of selecting gameBoard by using ordered list instead of every list items.
// But in this case we have to tell function that gap btw list item is not considered as textcontent by If(){}. 

// const gameBoardElement = document.getElementById('game-board');
// gameBoardElement.addEventListener('click', selectGameBoard );
// function selectGameBoard (event) {
//     if (event.target.tagName !== 'LI' || gameIsOver) {
//         return;
//     }
//     event.target.textContent = players[activePlayer].symbol;
//     event.target.classList.add('disabled');
//     switchPlayer();
// }