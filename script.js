let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let cells = document.querySelectorAll(".cell");
let resetButton = document.querySelector("#reset button");
let text = document.getElementById("text");

let winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", function () {
    let index = cell.getAttribute("data-index");

    if (board[index] === "" && gameActive) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      // ✅ Change color of X and O
      if (currentPlayer === "X") {
        cell.style.color = "black";
      } else {
        cell.style.color = "green";
      }

      if (checkWin(currentPlayer)) {
        text.textContent = "Congratulations Winner is " + currentPlayer;
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        text.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

function checkWin(player) {
  return winConditions.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

resetButton.addEventListener("click", function () {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  text.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.color = ""; // ✅ Clear previous color on reset
  });
});
