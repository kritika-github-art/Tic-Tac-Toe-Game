document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameBoard = Array(9).fill(null);
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.id);

        if (gameBoard[cellIndex] || !gameActive) {
            return;
        }

        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell)) {
            status.textContent = `It's a tie!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        gameBoard = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        status.textContent = "";
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
