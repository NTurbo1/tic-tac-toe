function start() {
    let emptyCells = document.querySelectorAll(".empty-cell");
    addClickEventsToEmptyCells(emptyCells);
} 

start();//Starts the game.

function sumOfElementsIn(array) {
    return array.reduce((a, b) => a+b, 0);
}

function addThreeColumnsTo(div, rowNumber) {
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    let col3 = document.createElement("div");

    if (rowNumber % 2 == 1) {
        col1.classList.add("col-1", "darker-cell");
        col2.classList.add("col-2", "brighter-cell");
        col3.classList.add("col-3", "darker-cell");
    } else {
        col1.classList.add("col-1", "brighter-cell");
        col2.classList.add("col-2", "darker-cell");
        col3.classList.add("col-3", "brighter-cell");
    }

    [col1, col2, col3].forEach(col => {
        col.classList.add("cell", "empty-cell");
    });

    div.append(col1, col2, col3);
}

function createGameBoardDiv() {
    let boardDiv = document.createElement('div');
    boardDiv.classList.add("game-board");

    let row1 = document.createElement("div");
    row1.classList.add("row-1");
    addThreeColumnsTo(row1, 1);

    let row2 = document.createElement("div");
    row2.classList.add("row-2");
    addThreeColumnsTo(row2, 2);

    let row3 = document.createElement("div");
    row3.classList.add("row-3");
    addThreeColumnsTo(row3, 3);

    boardDiv.append(row1, row2, row3);

    return boardDiv;
}

let gameboard = (function () {

    let emptyCellsLeft = 9;

    let boardArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    let getRow1Score = () => {
        return sumOfElementsIn(boardArray[0]);
    }

    let getRow2Score = () => {
        return sumOfElementsIn(boardArray[1]);
    }

    let getRow3Score = () => {
        return sumOfElementsIn(boardArray[2]);
    }

    let getCol1Score = () => {
        let column = [boardArray[0][0], boardArray[1][0], boardArray[2][0]];
        return sumOfElementsIn(column);
    }

    let getCol2Score = () => {
        let column = [boardArray[0][1], boardArray[1][1], boardArray[2][1]];
        return sumOfElementsIn(column);
    }

    let getCol3Score = () => {
        let column = [boardArray[0][2], boardArray[1][2], boardArray[2][2]];
        return sumOfElementsIn(column);
    }

    let getDiag1Score = () => {
        let column = [boardArray[0][0], boardArray[1][1], boardArray[2][2]];
        return sumOfElementsIn(column);
    }

    let getDiag2Score = () => {
        let column = [boardArray[0][2], boardArray[1][1], boardArray[2][0]];
        return sumOfElementsIn(column);
    }

    return {emptyCellsLeft, boardArray, getRow1Score, getRow2Score, getRow3Score,
            getCol1Score, getCol2Score, getCol3Score, getDiag1Score,
            getDiag2Score};
})();

function addClickEventsToEmptyCells(emptyCells) {
    emptyCells.forEach((cell) => {
        cell.addEventListener('click', markX, {once: true});
    });
}

function createRestartQuestionBox() {
    let restartQuestion = document.createElement('h3');
    restartQuestion.classList.add("restart-question");
    restartQuestion.textContent = "You wanna play again?";

    return restartQuestion;
}

function createRestartBtn() {
    let restartBtn = document.createElement('button');
    restartBtn.classList.add("restart-btn");
    restartBtn.textContent = "Restart";
    restartBtn.addEventListener('click', (e) => {
        let mainBodyDiv = e.target.parentElement;
        let restartBtnDiv = document.querySelector(".restart-btn");
        let gameResultDiv = document.querySelector(".result-div");
        let restartQuestionBox = document.querySelector(".restart-question");
        let gameBoardDiv = createGameBoardDiv();

        mainBodyDiv.removeChild(restartBtnDiv);
        mainBodyDiv.removeChild(gameResultDiv);
        mainBodyDiv.removeChild(restartQuestionBox);
        mainBodyDiv.appendChild(gameBoardDiv);

        gameboard.emptyCellsLeft = 9;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameboard.boardArray[i][j] = 0;
            }
        }

        start(); //restarts the game.
    });

    return restartBtn;
}

function markX() {
    let symbol = document.createElement('h1');
    symbol.textContent = "X";
    this.appendChild(symbol);
    this.classList.remove("empty-cell");
    this.classList.add("x-marked");

    let allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.removeEventListener('click', markX);
    });

    gameboard.emptyCellsLeft -= 1;

    let colIndex = this.classList[0].split("-")[1]-1;
    let rowIndex = this.parentElement.classList[0].split("-")[1]-1;

    gameboard.boardArray[rowIndex][colIndex] = 1;

    let board = document.querySelector(".game-board");
    let mainBody = document.querySelector(".main-body");

    if (gameboard.getRow1Score() === 3 || gameboard.getRow2Score() === 3 || gameboard.getRow3Score() === 3 || 
        gameboard.getCol1Score() === 3 || gameboard.getCol2Score() === 3 || gameboard.getCol3Score() === 3 || 
        gameboard.getDiag1Score() === 3 || gameboard.getDiag2Score() === 3) {

        let resultDiv = document.createElement('div');
        resultDiv.classList.add("result-div");
        resultDiv.textContent = "Game Over! X wins!";

        mainBody.insertBefore(resultDiv, board);
        mainBody.removeChild(board);

        let restartQuestion = createRestartQuestionBox();
        mainBody.appendChild(restartQuestion);

        let restartBtn = createRestartBtn();
        mainBody.appendChild(restartBtn);

    } else if (gameboard.emptyCellsLeft == 0) {

        let resultDiv = document.createElement('div');
        resultDiv.classList.add("result-div");
        resultDiv.textContent = "Game Over! It's a draw!";

        mainBody.insertBefore(resultDiv, board);
        mainBody.removeChild(board);

        let restartQuestion = createRestartQuestionBox();
        mainBody.appendChild(restartQuestion);

        let restartBtn = createRestartBtn();
        mainBody.appendChild(restartBtn);

    } else {
        let remainingEmptyCells = document.querySelectorAll(".empty-cell");

        remainingEmptyCells.forEach((cell) => {
            cell.addEventListener('click', markO, {once: true});
        });
    }
}

function markO() {
    let symbol = document.createElement('h1');;
    symbol.textContent = "O";
    this.appendChild(symbol);
    this.classList.remove("empty-cell");
    this.classList.add("o-marked");

    let allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.removeEventListener('click', markO);
    });

    gameboard.emptyCellsLeft -= 1;

    let colIndex = this.classList[0].split("-")[1]-1;
    let rowIndex = this.parentElement.classList[0].split("-")[1]-1;

    gameboard.boardArray[rowIndex][colIndex] = -1;

    let board = document.querySelector(".game-board");
    let mainBody = document.querySelector(".main-body");

    if (gameboard.getRow1Score() == -3 || gameboard.getRow2Score() == -3 || gameboard.getRow3Score() == -3 || 
        gameboard.getCol1Score() == -3 || gameboard.getCol2Score() == -3 || gameboard.getCol3Score() == -3 || 
        gameboard.getDiag1Score() == -3 || gameboard.getDiag2Score() == -3) {

        let resultDiv = document.createElement('div');
        resultDiv.classList.add("result-div");
        resultDiv.textContent = "Game Over! O wins!";

        mainBody.insertBefore(resultDiv, board);
        mainBody.removeChild(board);

        let restartQuestion = createRestartQuestionBox();
        mainBody.appendChild(restartQuestion);

        let restartBtn = createRestartBtn();
        mainBody.appendChild(restartBtn);

    } else if (gameboard.emptyCellsLeft == 0) {

        let resultDiv = document.createElement('div');
        resultDiv.classList.add("result-div");
        resultDiv.textContent = "Game Over! It's a draw!";

        mainBody.insertBefore(resultDiv, board);
        mainBody.removeChild(board);

        let restartQuestion = createRestartQuestionBox();
        mainBody.appendChild(restartQuestion);

        let restartBtn = createRestartBtn();
        mainBody.appendChild(restartBtn);

    } else {
        let remainingEmptyCells = document.querySelectorAll(".empty-cell");

        remainingEmptyCells.forEach((cell) => {
            cell.addEventListener('click', markX, {once: true});
        });
    }
}

function boardToString() {
    let b = gameboard.boardArray;
    let s = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            s += b[i][j] + " ";
        }
        
        s += "\n";
    }

    return s;
}
