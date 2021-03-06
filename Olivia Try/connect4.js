/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array  Question 1:
  for (let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length:WIDTH})) //?
  
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board" done
 const htmlBoard = document.getElementById('board');
  // column tops clickable area for adding a piece to that column)
 const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);


  // make main part of board
  for (let column = 0; column < HEIGHT; column++) {
    const rowElement = document.createElement("tr");
    for (let row = 0; row < WIDTH; row++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${column}-${row}`);
      rowElement.append(cell);
    }
    htmlBoard.append(rowElement);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
//QUESTION 1!
function findSpotForCol(x) {
  console.log("findSpotForCol");
  console.log({ board });
  // TODO: write the real version of this, rather than always returning 0
for (let y=HEIGHT-1;y>=0;y--){
  if(!board[y][x]){
    return y;
  }
}
return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  console.log("placeInTable");
  console.log({ y, x });
  const piece =document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  piece.style.top=-50*(y+2);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);

  //QUESTION 2 -50??
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  console.log("handleClick");
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // Question 3!!!place piece in board and add to HTML table
  board[y][x]=currPlayer;
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  //question four!!!
  if (board.every(row=>row.every(cell=>cell))) {
    return endGame('Tie!');
  }
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
currPlayer=currPlayer===1?2:1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */
//question five!!!
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
