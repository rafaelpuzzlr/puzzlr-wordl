const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');

const WORD_LENGTH = 5;
const GRID_SIZE = 6; // Wordle uses 6 rows
const targetWord = 'HARRY'; // Example target word (can be randomized later)

// Initialize the grid
function createGrid() {
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;
  grid.style.gap = '5px';
  grid.style.marginBottom = '20px';

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < WORD_LENGTH; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      // Add styling for the grid cells
      cell.style.width = '60px';
      cell.style.height = '60px';
      cell.style.display = 'flex';
      cell.style.justifyContent = 'center';
      cell.style.alignItems = 'center';
      cell.style.fontSize = '32px';
      cell.style.fontWeight = 'bold';
      cell.style.backgroundColor = '#fff';
      cell.style.border = '2px solid #d3d6da';
      cell.style.textTransform = 'uppercase';
      cell.style.color = '#000';
      cell.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';

      grid.appendChild(cell);
    }
  }
}

// Initialize the keyboard
function createKeyboard() {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete']
  ];

  keyboard.style.display = 'flex';
  keyboard.style.flexDirection = 'column';
  keyboard.style.alignItems = 'center';
  keyboard.style.gap = '6px';

  keys.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.justifyContent = 'center';
    rowDiv.style.gap = '6px';

    row.forEach(key => {
      const button = document.createElement('button');
      button.textContent = key;
      button.classList.add('key');

      // Add styling for the keyboard keys
      button.style.padding = '10px 15px';
      button.style.fontSize = '16px';
      button.style.fontWeight = 'bold';
      button.style.backgroundColor = '#d3d6da';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.cursor = 'pointer';
      button.style.textTransform = 'uppercase';
      button.style.color = '#000';
      button.style.transition = 'background-color 0.3s ease';

      // Special styling for Enter and Backspace keys
      if (key === 'Enter' || key === 'Backspace') {
        button.style.padding = '10px 20px';
        button.style.fontSize = '14px';
      }

      button.addEventListener('click', () => handleKeyPress(key));
      rowDiv.appendChild(button);
    });

    keyboard.appendChild(rowDiv);
  });
}

// Handle key press (from keyboard or virtual keyboard)
let currentRow = 0;
let currentCol = 0;

function handleKeyPress(key) {
  if (key === 'Delete') {
    if (currentCol > 0) {
      currentCol--;
      const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
      cell.textContent = '';
    }
  } else if (key === 'Enter') {
    if (currentCol === WORD_LENGTH) {
      checkGuess();
      currentRow++;
      currentCol = 0;
    } else {
      showMessage('Not enough letters!');
    }
  } else if (currentCol < WORD_LENGTH) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
    cell.textContent = key;
    currentCol++;
  }
}

// Check the guess against the target word
function checkGuess() {
  let correct = true;
  for (let col = 0; col < WORD_LENGTH; col++) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${col}']`);
    const letter = cell.textContent;
    if (letter === targetWord[col]) {
      cell.style.backgroundColor = '#6aaa64'; // Green for correct
      cell.style.borderColor = '#6aaa64';
      cell.style.color = '#fff';
    } else if (targetWord.includes(letter)) {
      cell.style.backgroundColor = '#c9b458'; // Yellow for misplaced
      cell.style.borderColor = '#c9b458';
      cell.style.color = '#fff';
      correct = false;
    } else {
      cell.style.backgroundColor = '#787c7e'; // Gray for incorrect
      cell.style.borderColor = '#787c7e';
      cell.style.color = '#fff';
      correct = false;
    }
  }

  if (correct) {
    showMessage('You win!');
    disableKeyboard(); // Disable keyboard after winning
  } else if (currentRow === GRID_SIZE - 1) {
    showMessage(`Game over! The word was ${targetWord}.`);
    disableKeyboard(); // Disable keyboard after losing
  }
}

// Show a message and clear it after a delay
function showMessage(text) {
  message.textContent = text;
  setTimeout(() => {
    message.textContent = '';
  }, 3000);
}

// Disable keyboard after game ends
function disableKeyboard() {
  const keys = document.querySelectorAll('.key');
  keys.forEach(key => {
    key.disabled = true;
  });
}

// Initialize the game
createGrid();
createKeyboard();
