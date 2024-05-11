//much of the code is inspired by https://hackr.io/blog/how-to-build-tic-tac-toe-in-javascript
//thanks to the author for this one xoxoxo
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the game board
    gameActive = true; // Set the game as active
    currentPlayer = 'X'; // Reset to player X
    // Clear all cells on the UI
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
  }

function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
  }

function announceWinner(player) {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
  }
  
function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
  }

function checkForWinOrDraw(player="X") {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }
  
    if (roundWon) {
        winner = player;
        announceWinner(winner);
        gameActive = false;
        return;
    }
  
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
  }
function getPossibleMoves(board){
    let possibleMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            possibleMoves.push(i);
        }
    }
    return possibleMoves;
}
function DetermineWinner(board){
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;

}

function minimax(newBoard,depth){
    winner = DetermineWinner(newBoard);
    let possibleMoves = getPossibleMoves(newBoard);
    let player = depth % 2 == 0 ? "O" : "X";
    let bestMove = player == "O" ? -Infinity : +Infinity;
    if (winner || possibleMoves.length == 0){
        if (winner == "X"){
            return depth-10;
        } 
        else if (winner == "O"){
            return 10-depth;
        } 
        else {
            return 0;
        }
    }
    for(let i = 0; i < possibleMoves.length; i++){
        let move = possibleMoves[i];
        let nextBoard = newBoard.slice();
        nextBoard[move] = player;
        let score = minimax(nextBoard,depth + 1);
        bestMove = player == "O" ? Math.max(score,bestMove) : Math.min(score,bestMove);
    }
    return bestMove;
}

function AIMove(){
    let possibleMoves = getPossibleMoves(gameBoard);
    let bestMove = -1;
    let bestScore = -Infinity;
    for(let i = 0; i < possibleMoves.length; i++){
        let move = possibleMoves[i];

        let newBoard = gameBoard.slice();
        newBoard[move] = "O";
        let score = minimax(newBoard,1);
        if (score > bestScore){
            bestScore = score;
            bestMove = move;
        }
    }
    console.log("best move: " +bestMove + " best score: " + bestScore);
    return bestMove;
}

function handleAITurn() {
    if (!gameActive) return;
    const index = AIMove();
    gameBoard[index] = "O";
    checkForWinOrDraw("O");
    updateUI();
}

  

function handlePlayerTurn(clickedCellIndex){
    if (gameBoard[clickedCellIndex] !== "" || !gameActive) return;
    gameBoard[clickedCellIndex] = Player;
    checkForWinOrDraw(Player);
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
   
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    handlePlayerTurn(clickedCellIndex);
    updateUI();
    handleAITurn();
  }



let Player = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
  ];

cells.forEach(cell => {
    cell.addEventListener("click",cellClicked,false)
});

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);