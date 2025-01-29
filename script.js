const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const submitButton = document.getElementById('submit-button');
const message = document.getElementById('message');

const WORD_LENGTH = 5;
const GRID_SIZE = 6;
const targetWord = 'CRANE';
let currentRow = 0;
let currentCol = 0;
let guess = '';

function createGrid() {
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      rowDiv.appendChild(cell);
    }
    grid.appendChild(rowDiv);
  }
}

function createKeyboard() {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  keys.forEach(key => {
    const button = document.createElement('button');
    button.textContent = key;
    button.classList.add('key');
    button.addEventListener('click', () => handleKeyPress(key));
    keyboard.appendChild(button);
  });
}

function handleKeyPress(key) {
  if (currentCol < WORD_LENGTH) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
    cell.textContent = key;
    guess += key;
    currentCol++;
  }
}

submitButton.addEventListener('click', () => {
  if (guess.length === WORD_LENGTH) {
    checkGuess();
    currentRow++;
    currentCol = 0;
    guess = '';
  } else {
    showMessage('Not enough letters!');
  }
});

function checkGuess() {
  for (let col = 0; col < WORD_LENGTH; col++) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${col}']`);
    const letter = cell.textContent;
    if (letter === targetWord[col]) {
      cell.classList.add('correct');
    } else if (targetWord.includes(letter)) {
      cell.classList.add('misplaced');
    } else {
      cell.classList.add('incorrect');
    }
  }
  if (guess === targetWord) {
    showMessage('You win!');
    disableKeyboard();
  } else if (currentRow === GRID_SIZE - 1) {
    showMessage(`Game over! The word was ${targetWord}.`);
    disableKeyboard();
  }
}

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => { message.textContent = ''; }, 3000);
}

function disableKeyboard() {
  document.querySelectorAll('.key').forEach(key => key.disabled = true);
}

createGrid();
createKeyboard();
