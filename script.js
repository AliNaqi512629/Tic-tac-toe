const board = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset-btn");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const playAgainButton = document.getElementById("play-again-btn");

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Create the grid
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-cell-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute("data-cell-index");

    if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCellIndex);
    checkWinner();
}

// Update the cell
function updateCell(index) {
    gameBoard[index] = currentPlayer;
    document.querySelector(`[data-cell-index='${index}']`).textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for a winner or a tie
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            highlightWinningCells(pattern);
            showPopup(`Player ${gameBoard[a]} Wins!`);
            return;
        }
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        showPopup("It's a Tie!");
    }
}

// Highlight winning cells
function highlightWinningCells(pattern) {
    pattern.forEach(index => {
        document.querySelector(`[data-cell-index='${index}']`).classList.add("winning-cell");
    });
}

// Show popup
function showPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
}

// Reset the game
resetButton.addEventListener("click", resetGame);
playAgainButton.addEventListener("click", resetGame);

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = `Player X's Turn`;
    statusDisplay.classList.remove("winner", "tie");
    popup.style.display = "none";

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
}
