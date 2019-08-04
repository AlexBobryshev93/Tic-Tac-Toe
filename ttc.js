const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const fieldImg = new Image();
const xImg = new Image();
const oImg = new Image();
const box = 96; // square size (pxl)
let turn;
let turnNumber = 1;
let msg;

let cells = [
  ["[0][0]", "[0][1]", "[0][2]"],
  ["[1][0]","[1][1]", "[1][2]"],
  ["[2][0]", "[2][1]", "[2][2]"]
];

fieldImg.src = "images/field.png";
xImg.src = "images/X.png";
oImg.src = "images/O.png";

function updateField(event) {
  let click = {
    x: event.offsetX,
    y: event.offsetY
  };

  if (click.x > 2 * box && click.x < 3 * box && click.y > 2 * box && click.y < 3 * box) makeTurn(0, 0);
  else if (click.x > 3 * box && click.x < 4 * box && click.y > 2 * box && click.y < 3 * box) makeTurn(0, 1);
  else if (click.x > 4 * box && click.x < 5 * box && click.y > 2 * box && click.y < 3 * box) makeTurn(0, 2);
  else if (click.x > 2 * box && click.x < 3 * box && click.y > 3 * box && click.y < 4 * box) makeTurn(1, 0);
  else if (click.x > 3 * box && click.x < 4 * box && click.y > 3 * box && click.y < 4 * box) makeTurn(1, 1);
  else if (click.x > 4 * box && click.x < 5 * box && click.y > 3 * box && click.y < 4 * box) makeTurn(1, 2);
  else if (click.x > 2 * box && click.x < 3 * box && click.y > 4 * box && click.y < 5 * box) makeTurn(2, 0);
  else if (click.x > 3 * box && click.x < 4 * box && click.y > 4 * box && click.y < 5 * box) makeTurn(2, 1);
  else if (click.x > 4 * box && click.x < 5 * box && click.y > 4 * box && click.y < 5 * box) makeTurn(2, 2);
  else return;
}

function makeTurn(x, y) {
  if (cells[x][y] != "X" && cells[x][y] != "O") { // click on an empty cell
    if (turn == "X") context.drawImage(xImg, (2 + y) * box + 4, (2 + x) * box + 4);
    else if (turn == "O") context.drawImage(oImg, (2 + y) * box + 4, (2 + x) * box + 4);
    cells[x][y] = turn;
    
    if (!checkWin()) nextTurn();
  }
}

function nextTurn() {
  if (turnNumber >= 9) { // draw
    msg = "It's a draw...";
    printMsg();
    canvas.removeEventListener("click", updateField);
    return;
  }

  if (turn == "X") turn = "O";
  else if (turn == "O") turn = "X";
  turnNumber++;
  msg = turn + " makes the turn";
  printMsg();
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
    if ((cells[i][0] == cells[i][1]) && (cells[i][0] == cells[i][2])) { // check every horizontal line
      msg = cells[i][0] + " wins. Congrats!";
      printMsg();
      canvas.removeEventListener("click", updateField);
      return true;
    }

    if ((cells[0][i] == cells[1][i]) && (cells[0][i] == cells[2][i])) { // check every vertical line
      msg = cells[0][i] + " wins. Congrats!";
      printMsg();
      canvas.removeEventListener("click", updateField);
      return true;
    }
  }

  if ((cells[0][0] == cells[1][1]) && (cells[0][0] == cells[2][2])) { // diagonal
    msg = cells[0][0] + " wins. Congrats!";
    printMsg();
    canvas.removeEventListener("click", updateField);
    return true;
  }

  if ((cells[0][2] == cells[1][1]) && (cells[0][2] == cells[2][0])) { // diagonal
    msg = cells[0][2] + " wins. Congrats!";
    printMsg();
    canvas.removeEventListener("click", updateField);
    return true;
  }

  return false;
}

function startGame() {
  if (Math.floor(Math.random() * 2) == 1) turn = "X"; // who will be the first? 
  else turn = "O";
  msg = turn + " makes the 1st turn";

  context.drawImage(fieldImg, 0, 0);
  context.font = "30px Times New Roman";
  printMsg();
  canvas.addEventListener("click", updateField);
}

function printMsg() {
  context.fillStyle = "green";
  context.fillRect(box + 16, box / 3 - 16, 400, 60);
  context.fillStyle = "red";
  context.fillText(msg, box * 2, 10 + box / 2);
}

