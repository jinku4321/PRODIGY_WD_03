const cells = document.querySelectorAll('[data-cell]');
let isCircleTurn = false; // To track whose turn it is
let boardState = Array(9).fill(null); // Track the state of each cell
const winningCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

const playerX = document.getElementById('playerX');
const playerO = document.getElementById('playerO');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById("resetButton");

// Initializing by showing Player X's turn
playerX.classList.add('active');
statusDiv.textContent = "Player X's Turn";

// Attaching click event listener to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index), { once: true });
});

resetButton.addEventListener('click', resetGame);

function handleClick(index) {
    if (boardState[index]) return;

    const currentClass = isCircleTurn ? 'O' : 'X';
    
    // Place the mark and update board state
    placeMark(index, currentClass);
    boardState[index] = currentClass;
    
    // Check for win or draw
    if (checkWin(currentClass)) {
        statusDiv.textContent = `${currentClass} Wins!`;
        showModal(`${currentClass} Wins!`);
        // resetGame();
        return;
    } else if (boardState.every(cell => cell)) {
        statusDiv.textContent = "It's a Draw!";
        showModal("It's a Draw!");
        return;
    }
    
    // Swap turns
    swapTurns();
}

function placeMark(index, currentClass) {
    cells[index].textContent = currentClass;
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
    
    // Toggle the active player display
    if (isCircleTurn) {
        playerX.classList.remove('active');
        playerO.classList.add('active');
        statusDiv.textContent = "Player O's Turn";
    } else {
        playerO.classList.remove('active');
        playerX.classList.add('active');
        statusDiv.textContent = "Player X's Turn";
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentClass;
        });
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = ''; 
    });
    boardState.fill(null); // Reset board state
    isCircleTurn = false; // Reset turn to the starting player
    playerX.classList.add('active');
    playerO.classList.remove('active');
    statusDiv.textContent = "Player X's Turn"; // Reset status
    // Re-attach click event
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index), { once: true });
    });
}
// for welcome messege model
document.addEventListener('DOMContentLoaded', (event) => {
    var welcomeModal = document.getElementById("welcomeModal");
    var startGameButton = document.getElementById("startGameButton");
    startGameButton.onclick = function() {
        welcomeModal.style.display = "none";
    }
});

// for GameOver model
function showModal(message) {
    var modal = document.getElementById("statusModal");
    var modalMessage = document.getElementById("modalMessage");
    var span = document.getElementsByClassName("close")[0];

    modalMessage.textContent = `Game Over: ${message}`;
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        resetGame();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetGame();
        }
    }
}

