// script.js
const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const submitButton = document.getElementById('submit-button');
const message = document.getElementById('message');

const WORD_LENGTH = 5;
const GRID_SIZE = 5;
const targetWord = 'CRANE'; // Example target word (can be randomized later)

// Initialize the grid
function createGrid() {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      grid.appendChild(cell);
    }
  }
}

// Initialize the keyboard
function createKeyboard() {
  const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  keys.forEach(key => {
    const button = document.createElement('button');
    button.textContent = key;
    button.addEventListener('click', () => handleKeyPress(key));
    keyboard.appendChild(button);
  });
}

// Handle key press (from keyboard or virtual keyboard)
let currentRow = 0;
let currentCol = 0;

function handleKeyPress(key) {
  if (currentCol < WORD_LENGTH) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
    cell.textContent = key;
    currentCol++;
  }
}

// Handle submit
submitButton.addEventListener('click', () => {
  if (currentCol === WORD_LENGTH) {
    checkGuess();
    currentRow++;
    currentCol = 0;
  } else {
    message.textContent = 'Not enough letters!';
  }
});

// Check the guess against the target word
function checkGuess() {
  let correct = true;
  for (let col = 0; col < WORD_LENGTH; col++) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${col}']`);
    const letter = cell.textContent;
    if (letter === targetWord[col]) {
      cell.style.backgroundColor = '#4caf50'; // Green for correct
    } else if (targetWord.includes(letter)) {
      cell.style.backgroundColor = '#ffeb3b'; // Yellow for misplaced
      correct = false;
    } else {
      cell.style.backgroundColor = '#ccc'; // Gray for incorrect
      correct = false;
    }
  }

  if (correct) {
    message.textContent = 'You win!';
  } else if (currentRow === GRID_SIZE - 1) {
    message.textContent = `Game over! The word was ${targetWord}.`;
  }
}

// Initialize the game
createGrid();
createKeyboard();
