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

      // Add styling for the grid cells
      cell.style.width = '60px';
      cell.style.height = '60px';
      cell.style.display = 'flex';
      cell.style.justifyContent = 'center';
      cell.style.alignItems = 'center';
      cell.style.fontSize = '24px';
      cell.style.fontWeight = 'bold';
      cell.style.backgroundColor = '#fff';
      cell.style.border = '2px solid #ddd';
      cell.style.textTransform = 'uppercase';
      cell.style.color = '#333';
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
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  keys.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';
    rowDiv.style.justifyContent = 'center';
    rowDiv.style.gap = '6px';
    rowDiv.style.marginBottom = '6px';

    row.forEach(key => {
      const button = document.createElement('button');
      button.textContent = key;
      button.classList.add('key');

      // Add styling for the keyboard keys
      button.style.width = '40px';
      button.style.height = '50px';
      button.style.fontSize = '16px';
      button.style.fontWeight = 'bold';
      button.style.backgroundColor = '#f0f0f0';
      button.style.border = '2px solid #ddd';
      button.style.cursor = 'pointer';
      button.style.textTransform = 'uppercase';
      button.style.color = '#333';
      button.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';

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
  if (currentCol < WORD_LENGTH) {
    const cell = document.querySelector(`.cell[data-row='${currentRow}'][data-col='${currentCol}']`);
    cell.textContent = key;
    cell.classList.add('filled');
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
    showMessage('Not enough letters!');
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
      cell.style.borderColor = '#4caf50';
      cell.style.color = '#fff';
    } else if (targetWord.includes(letter)) {
      cell.style.backgroundColor = '#ffeb3b'; // Yellow for misplaced
      cell.style.borderColor = '#ffeb3b';
      cell.style.color = '#333';
      correct = false;
    } else {
      cell.style.backgroundColor = '#ccc'; // Gray for incorrect
      cell.style.borderColor = '#ccc';
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
