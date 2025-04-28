const gameBoard = (function () {
  let board = [];

  const initBoard = () => {
    for (let i = 0; i < 3; i++) {
      board.push([]);
      for (let j = 0; j < 3; j++) {
        board[i].push([]);
      }
    }
  };

  const getBoard = () => {
    return board;
  };

  return { initBoard, getBoard };
})();

gameBoard.initBoard();
console.log(gameBoard.getBoard());
