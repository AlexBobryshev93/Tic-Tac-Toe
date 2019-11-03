const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const fieldImg = new Image();
const menuImg = new Image();
const labelImg = new Image();
const xImg = new Image();
const oImg = new Image();
const box = 96; // square size (pxl)

fieldImg.src = "images/field.png";
menuImg.src = "images/menu.png";
labelImg.src = "images/label.png";
xImg.src = "images/X.png";
oImg.src = "images/O.png";

let turn = "X"; // "X" or "O"
let turnNumber = 1;
let msg;
let computerOpponent = true;
let difficulty; 
let computerOpponentTurn; // will be set according to the difficulty level
let startEvent; // needed for restart

let cells = [ // we could leave it just undefined, but the strings were used for the debugging purposes; in process there will be "X" or "O"
    ["[0][0]", "[0][1]", "[0][2]"],
    ["[1][0]","[1][1]", "[1][2]"],
    ["[2][0]", "[2][1]", "[2][2]"]
];

document.addEventListener("keydown", menuChoice);

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
        context.drawImage(labelImg, 112, 16);
        context.fillStyle = "black";
        context.fillText(msg, box * 2.5, 10 + box / 2);
        if (turn == "X") canvas.removeEventListener("click", updateField);
        clearInterval(computerOpponentTurn);
        return;
    }

    if (turn == "X") {
        turn = "O";
        if (computerOpponent) canvas.removeEventListener("click", updateField);
    } else if (turn == "O") {
        turn = "X";
        if (computerOpponent) canvas.addEventListener("click", updateField);
    }

    turnNumber++;
    msg = turn + " makes the turn";
    printMsg();
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if ((cells[i][0] == cells[i][1]) && (cells[i][0] == cells[i][2])) { // check every horizontal line
             msg = cells[i][0] + " wins. Congrats!";
      
            context.beginPath(); 
            context.lineWidth = 2.5;      
            if (turn == "O") context.strokeStyle = "red";
            else context.strokeStyle = "blue";
            context.moveTo(2 * box, (i + 2.5) * box);
            context.lineTo(5 * box, (i + 2.5) * box);
            context.stroke();

            printMsg();
            canvas.removeEventListener("click", updateField);
            clearInterval(computerOpponentTurn);
            return true;
        }

        if ((cells[0][i] == cells[1][i]) && (cells[0][i] == cells[2][i])) { // check every vertical line
            msg = cells[0][i] + " wins. Congrats!";

            context.beginPath(); 
            context.lineWidth = 2.5;      
            if (turn == "O") context.strokeStyle = "red";
            else context.strokeStyle = "blue";
            context.moveTo((i + 2.5) * box, 2 * box);
            context.lineTo((i + 2.5) * box, 5 * box);
            context.stroke();

            printMsg();
            canvas.removeEventListener("click", updateField);
            clearInterval(computerOpponentTurn);
            return true;
        }
    }

    if ((cells[0][0] == cells[1][1]) && (cells[0][0] == cells[2][2])) { // main diagonal
        msg = cells[0][0] + " wins. Congrats!";

        context.beginPath(); 
        context.lineWidth = 2.5;      
        if (turn == "O") context.strokeStyle = "red";
        else context.strokeStyle = "blue";
        context.moveTo(2 * box, 2 * box);
        context.lineTo(5 * box, 5 * box);
        context.stroke();

        printMsg();
        clearInterval(computerOpponentTurn);
        canvas.removeEventListener("click", updateField);
        return true;
    }

    if ((cells[0][2] == cells[1][1]) && (cells[0][2] == cells[2][0])) { // second diagonal
        msg = cells[0][2] + " wins. Congrats!";

        context.beginPath(); 
        context.lineWidth = 2.5;      
        if (turn == "O") context.strokeStyle = "red";
        else context.strokeStyle = "blue";
        context.moveTo(5 * box, 2 * box);
        context.lineTo(2 * box, 5 * box);
        context.stroke();

        printMsg();
        clearInterval(computerOpponentTurn);
        canvas.removeEventListener("click", updateField);
        return true;
    }

    return false;
}

function startGame() {
    context.drawImage(fieldImg, 0, 0);
    context.font = "30px Times New Roman";
    context.fillStyle = "red";
    if (computerOpponent) context.fillText("Difficulty: " + difficulty, box * 2 + 32, box * 6 - 5);
    if (Math.floor(Math.random() * 2) == 1) turn = "X"; // who will be the first? 
    else turn = "O"; 
    msg = turn + " makes the 1st turn";
    printMsg();
    if (!computerOpponent || turn == "X") canvas.addEventListener("click", updateField);
	document.getElementById("restart").style.display="block";
}

function startMenu() {
    context.drawImage(menuImg, 0, 0);
}

function menuChoice(event) {
    startEvent = event;
	
	switch (event.keyCode) {
        case 49:
            computerOpponent = false;
            document.removeEventListener("keydown", menuChoice);
            startGame();
            break;
        case 50:
            computerOpponent = true;
            document.removeEventListener("keydown", menuChoice);
            difficulty = "EASY";
            computerOpponentTurn = setInterval(easyComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking
            startGame();
            break;
        case 51:
            computerOpponent = true;
            document.removeEventListener("keydown", menuChoice);
            difficulty = "NORMAL";
            computerOpponentTurn = setInterval(normalComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking
            startGame();
            break;
        case 52:
            computerOpponent = true;
            document.removeEventListener("keydown", menuChoice);
            difficulty = "HARD";
            computerOpponentTurn = setInterval(hardComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking
            startGame();
            break;    
    }
}

function printMsg() {
    context.drawImage(labelImg, 112, 16);
    if (turn == "O") context.fillStyle = "red";
    else context.fillStyle = "blue";
    context.fillText(msg, box * 2, 10 + box / 2);
}

function restart() { //resets the game data
	turn = "X";
	turnNumber = 1;
	cells = [
		["[0][0]", "[0][1]", "[0][2]"],
		["[1][0]","[1][1]", "[1][2]"],
		["[2][0]", "[2][1]", "[2][2]"]
	];
	
	menuChoice(startEvent);
}

/*
function dHtmlLoadScript(url)
{
   let elem = document.createElement("script");
   elem.src = url;
   document.getElementsByTagName("body")[0].appendChild(elem); 
}
*/

