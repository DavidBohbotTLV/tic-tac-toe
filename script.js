// Declare callback functions
const handleClick = (e) => {
  // Declare click functions
  const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
  };

  const checkWin = (currentClass) => {
    // Declare checkWin constants
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // Loop possible Winning Combinations (returns a bool)
    return WINNING_COMBINATIONS.some((combination) => {
      // Loop cell in possible Winning Combinations (returns a bool)
      return combination.every((index) => {
        // Check if current class in cell classList (returns a bool)
        return cellElements[index].classList.contains(currentClass);
      });
    });
  };

  const endGame = (draw) => {
    // Set Winning Message
    draw
      ? (winningMessageTextElement.innerText = `Draw!`)
      : (winningMessageTextElement.innerText = `${
          oTurn ? "O's" : "X's"
        } Wins!`);
    // Show Winning Message
    winningMessageElement.classList.add("show");
  };

  const isDraw = () => {
    // Deconstruct cellElments into an array and loop every cell to check if it has x class or o class
    return [...cellElements].every((cell) => {
      // check which class the cell has x or o
      return (
        cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      );
    });
  };

  const swapTurns = () => {
    // Toggle oTurn bool
    oTurn = !oTurn;
  };

  const setNextMark = () => {
    swapTurns();
    setBoardHoverClass();
  };

  // Declare click constants
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;

  // Click Logic
  placeMark(cell, currentClass);
  checkWin(currentClass)
    ? endGame(false)
    : isDraw()
    ? endGame(true)
    : setNextMark();
};

// Declare callback caller functions
const startGame = () => {
  // Declare startGame variables
  oTurn = false;

  // startGame Logic
  cellElements.forEach((cell) => {
    // set Game Initial state
    winningMessageElement.classList.remove("show");
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);

    // Game Logic
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
};

// Declare Game functions
const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  oTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS);
};

// Get DOM Elements as constants
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

// Declare HARDCODED Game constants
const X_CLASS = "x";
const O_CLASS = "o";

// Declare Game variables
let oTurn;

// Self executing function (consider it the main)
(() => {
  startGame();
  restartButton.addEventListener("click", startGame);
})();
