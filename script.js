const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let isXTurn = true;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.removeEventListener('click', handleClick); // Clear old listener
    cell.addEventListener('click', handleClick, { once: true });
  });
  message.textContent = '';
  isXTurn = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    message.textContent = Player ${isXTurn ? 'X' : 'O'} wins!;
    endGame();
  } else if (isDraw()) {
    message.textContent = "It's a draw!";
    endGame();
  } else {
    isXTurn = !isXTurn;
  }
}

function checkWin(currentClass) {
  return winCombos.some(combo =>
    combo.every(index => cells[index].classList.contains(currentClass))
  );
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);

startGame();