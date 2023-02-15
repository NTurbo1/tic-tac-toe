let gameboard = (function () {
    let emptyCells = document.querySelectorAll(".empty-cell");
    addingClickEventsToEmptyCells(emptyCells);
})();

function addingClickEventsToEmptyCells(emptyCells) {
    emptyCells.forEach((cell) => {
        cell.addEventListener('click', markX, {once: true});
    });
}

function markX(e) {
    let symbol = document.createElement('h1');
    symbol.textContent = "X";
    this.appendChild(symbol);
    this.classList.remove("empty-cell");

    let allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.removeEventListener('click', markX);
    });

    let remainingEmptyCells = document.querySelectorAll(".empty-cell");

    remainingEmptyCells.forEach((cell) => {
        cell.addEventListener('click', markO, {once: true});
    })
}

function markO() {
    let symbol = document.createElement('h1');
    symbol.textContent = "O";
    this.appendChild(symbol);
    this.classList.remove("empty-cell");

    let allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.removeEventListener('click', markO);
    });

    let remainingEmptyCells = document.querySelectorAll(".empty-cell");

    remainingEmptyCells.forEach((cell) => {
        cell.addEventListener('click', markX, {once: true});
    })
}
