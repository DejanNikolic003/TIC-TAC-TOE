const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const placeMark = (index, mark) => {
    if (board[index] !== "") return;
    board[index] = mark;
  };

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { placeMark, getBoard, resetBoard };
})();

const createPlayer = (name, mark) => ({ name, mark });

const gameController = (playerOne, playerTwo) => {
  let currentPlayer = playerOne;

  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const playMove = (index) => {
    if (checkWinner()) {
      return;
    }

    gameBoard.placeMark(index, currentPlayer.mark);
    changePlayer();
  };

  const changePlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const checkWinner = () => {
    const board = gameBoard.getBoard();

    if (board.every((cell) => cell !== "")) {
      return "Tie";
    }

    for (let combo of winCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  return { playMove, checkWinner };
};

const displayController = () => {
  const playerOne = createPlayer("Dejan", "X");
  const playerTwo = createPlayer("Computer", "O");
  const game = gameController(playerOne, playerTwo);

  const boardContainer = document.querySelector(".board-container");
  const winnerContainer = document.querySelector(".winner-container");

  const drawBoard = () => {
    const board = gameBoard.getBoard();

    for (let i = 0; i < board.length; i++) {
      const boardItem = document.createElement("div");
      boardItem.classList.add("board-item");
      boardItem.textContent = board[i];
      boardItem.dataset.index = i;
      boardContainer.append(boardItem);
    }

    handleEventListeners();
  };

  const refreshBoard = () => {
    boardContainer.innerHTML = "";

    drawBoard();
  };

  const drawWinner = (winner) => {
    winnerContainer.classList.remove("hidden");

    winnerContainer.textContent =
      winner === "Tie" ? "Tie!" : `${winner}'s won!`;
  };

  const hideWinner = () => {
    winnerContainer.classList.add("hidden");
  };

  const handleEventListeners = () => {
    const boardItems = document.querySelectorAll(".board-item");
    const resetButton = document.querySelector(".resetButton");

    boardItems.forEach((boardItem) => {
      boardItem.addEventListener("click", (event) => {
        const cellIndex = event.target.dataset.index;
        let winner;

        game.playMove(cellIndex);
        refreshBoard();

        winner = game.checkWinner();

        if (winner) {
          drawWinner(winner);
          return;
        }

        event.preventDefault();
      });
    });

    resetButton.addEventListener("click", (event) => {
      event.preventDefault();
      gameBoard.resetBoard();
      hideWinner();
      refreshBoard();
    });
  };

  return { drawBoard, refreshBoard };
};

const display = displayController();
display.drawBoard();
