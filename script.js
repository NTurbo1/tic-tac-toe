let gameboard = (function () {
    
    addingClickEventsToCells("X");
})();

function addingClickEventsToCells(symbolText) { //symbolText = "X" or symbolText = "O"
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            let c = e.target;
            let symbol = document.createElement('h1');
            symbol.textContent = symbolText;
            c.appendChild(symbol);
        }, {once: true});
    });
}

