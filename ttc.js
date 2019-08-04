const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const fieldImg = new Image();
const labelImg = new Image();
const xImg = new Image();
const oImg = new Image();
const box = 96; // square size (pxl)
let turn = "X";
let turnNumber = 1;
let msg;
let computerOpponent = true;
//let computerOpponentTurn = setInterval(easyComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking
//let computerOpponentTurn = setInterval(normalComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking
let computerOpponentTurn = setInterval(hardComputerOpponentTurn, 3000); // 3000 msec give the imitation of human thinking

let cells = [ // we could leave it just undefined, but the strings were used for the debugging purposes
    ["[0][0]", "[0][1]", "[0][2]"],
    ["[1][0]","[1][1]", "[1][2]"],
    ["[2][0]", "[2][1]", "[2][2]"]
];

fieldImg.src = "images/field.png";
labelImg.src = "images/label.png";
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

    if ((cells[0][0] == cells[1][1]) && (cells[0][0] == cells[2][2])) { // diagonal
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

    if ((cells[0][2] == cells[1][1]) && (cells[0][2] == cells[2][0])) { // diagonal
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
    if (Math.floor(Math.random() * 2) == 1) turn = "X"; // who will be the first? 
    else turn = "O"; 
    msg = turn + " makes the 1st turn";
    computerOpponent = confirm("Do you want to play against the computer?");
    printMsg();
    if (!computerOpponent || turn == "X") canvas.addEventListener("click", updateField);
}

function printMsg() {
    context.drawImage(labelImg, 112, 16);
    if (turn == "O") context.fillStyle = "red";
    else context.fillStyle = "blue";
    context.fillText(msg, box * 2, 10 + box / 2);
}

function easyComputerOpponentTurn() {
    if (computerOpponent) {
        if (turn == "O") {
            let possibleX;
            let possibleY;
            do {
                possibleX = Math.floor(Math.random() * 3);
                possibleY = Math.floor(Math.random() * 3);
            } while (cells[possibleX][possibleY] == "X" || cells[possibleX][possibleY] == "O");
            
            makeTurn(possibleX, possibleY);
        }
    }
}

function normalComputerOpponentTurn() {
    if (computerOpponent) {
        if (turn == "O") {
            if (turnNumber == 1 || (turnNumber == 2 && cells[1][1] != "X")) {
                makeTurn(1, 1);
                return;
            }

            if (turnNumber > 3) { // plain defence against 3 in a row
                for (let i = 0; i < 3; i++) { // against rows and columns
                    if (cells[i][0] == "X" && cells[i][1] == "X" && cells[i][2] != "O") {
                        makeTurn(i, 2);
                        return;
                    }
                    if (cells[i][2] == "X" && cells[i][1] == "X" && cells[i][0] != "O") {
                        makeTurn(i, 0);
                        return;
                    }
                    if (cells[i][0] == "X" && cells[i][2] == "X" && cells[i][1] != "O") {
                        makeTurn(i, 1);
                        return;
                    }
                    if (cells[0][i] == "X" && cells[1][i] == "X" && cells[2][i] != "O") {
                        makeTurn(2, i);
                        return;
                    }
                    if (cells[2][i] == "X" && cells[1][i] == "X" && cells[0][i] != "O") {
                        makeTurn(0, i);
                        return;
                    }
                    if (cells[0][i] == "X" && cells[2][i] == "X" && cells[1][i] != "O") {
                        makeTurn(1, i);
                        return;
                    }
                }

                if (cells[0][0] == "X" && cells[1][1] == "X" && cells[2][2] != "O") { // diagonal defence
                    makeTurn(2, 2);
                    return;
                } 
                if (cells[0][0] == "X" && cells[2][2] == "X" && cells[1][1] != "O") { // diagonal defence
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "X" && cells[2][2] == "X" && cells[0][0] != "O") { // diagonal defence
                    makeTurn(0, 0);
                    return;
                }    
                if (cells[0][2] == "X" && cells[1][1] == "X" && cells[2][0] != "O") { // diagonal defence
                    makeTurn(2, 0);
                    return;
                } 
                if (cells[0][2] == "X" && cells[2][0] == "X" && cells[1][1] != "O") { // diagonal defence
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "X" && cells[2][0] == "X" && cells[0][2] != "O") { // diagonal defence
                    makeTurn(0, 2);
                    return;
                }
            }

            let possibleX;
            let possibleY;
            do {
                possibleX = Math.floor(Math.random() * 3);
                possibleY = Math.floor(Math.random() * 3);

                
            } while (cells[possibleX][possibleY] == "X" 
                || cells[possibleX][possibleY] == "O" 
                || (turnNumber == 2 && (possibleX + possibleY) % 2 != 0) // the second turn only through the center or diagonals
            );
            
            makeTurn(possibleX, possibleY);
        }
    }
}

function hardComputerOpponentTurn() {
    if (computerOpponent) {
        if (turn == "O") {
            if (turnNumber == 1 || (turnNumber == 2 && cells[1][1] != "X")) {
                makeTurn(1, 1);
                return;
            }

            if (turnNumber > 3) { // plain win 3 in a row
                for (let i = 0; i < 3; i++) { // in rows and columns
                    if (cells[i][0] == "O" && cells[i][1] == "O" && cells[i][2] != "X") {
                        makeTurn(i, 2);
                        return;
                    }
                    if (cells[i][2] == "O" && cells[i][1] == "O" && cells[i][0] != "X") {
                        makeTurn(i, 0);
                        return;
                    }
                    if (cells[i][0] == "O" && cells[i][2] == "O" && cells[i][1] != "X") {
                        makeTurn(i, 1);
                        return;
                    }
                    if (cells[0][i] == "O" && cells[1][i] == "O" && cells[2][i] != "X") {
                        makeTurn(2, i);
                        return;
                    }
                    if (cells[2][i] == "O" && cells[1][i] == "O" && cells[0][i] != "X") {
                        makeTurn(0, i);
                        return;
                    }
                    if (cells[0][i] == "O" && cells[2][i] == "O" && cells[1][i] != "X") {
                        makeTurn(1, i);
                        return;
                    }
                }

                if (cells[0][0] == "O" && cells[1][1] == "O" && cells[2][2] != "X") { // diagonal
                    makeTurn(2, 2);
                    return;
                } 
                if (cells[0][0] == "O" && cells[2][2] == "O" && cells[1][1] != "X") { // diagonal
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "O" && cells[2][2] == "O" && cells[0][0] != "X") { // diagonal
                    makeTurn(0, 0);
                    return;
                }    
                if (cells[0][2] == "O" && cells[1][1] == "O" && cells[2][0] != "X") { // diagonal
                    makeTurn(2, 0);
                    return;
                } 
                if (cells[0][2] == "O" && cells[2][0] == "O" && cells[1][1] != "X") { // diagonal
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "O" && cells[2][0] == "O" && cells[0][2] != "X") { // diagonal
                    makeTurn(0, 2);
                    return;
                }
            }

            if (turnNumber > 3) { // plain defence against 3 in a row
                for (let i = 0; i < 3; i++) { // against rows and columns
                    if (cells[i][0] == "X" && cells[i][1] == "X" && cells[i][2] != "O") {
                        makeTurn(i, 2);
                        return;
                    }
                    if (cells[i][2] == "X" && cells[i][1] == "X" && cells[i][0] != "O") {
                        makeTurn(i, 0);
                        return;
                    }
                    if (cells[i][0] == "X" && cells[i][2] == "X" && cells[i][1] != "O") {
                        makeTurn(i, 1);
                        return;
                    }
                    if (cells[0][i] == "X" && cells[1][i] == "X" && cells[2][i] != "O") {
                        makeTurn(2, i);
                        return;
                    }
                    if (cells[2][i] == "X" && cells[1][i] == "X" && cells[0][i] != "O") {
                        makeTurn(0, i);
                        return;
                    }
                    if (cells[0][i] == "X" && cells[2][i] == "X" && cells[1][i] != "O") {
                        makeTurn(1, i);
                        return;
                    }
                }

                if (cells[0][0] == "X" && cells[1][1] == "X" && cells[2][2] != "O") { // diagonal defence
                    makeTurn(2, 2);
                    return;
                } 
                if (cells[0][0] == "X" && cells[2][2] == "X" && cells[1][1] != "O") { // diagonal defence
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "X" && cells[2][2] == "X" && cells[0][0] != "O") { // diagonal defence
                    makeTurn(0, 0);
                    return;
                }    
                if (cells[0][2] == "X" && cells[1][1] == "X" && cells[2][0] != "O") { // diagonal defence
                    makeTurn(2, 0);
                    return;
                } 
                if (cells[0][2] == "X" && cells[2][0] == "X" && cells[1][1] != "O") { // diagonal defence
                    makeTurn(1, 1);
                    return;
                }
                if (cells[1][1] == "X" && cells[2][0] == "X" && cells[0][2] != "O") { // diagonal defence
                    makeTurn(0, 2);
                    return;
                }
            }

            let possibleX;
            let possibleY;
            do {
                possibleX = Math.floor(Math.random() * 3);
                possibleY = Math.floor(Math.random() * 3);

                
            } while (cells[possibleX][possibleY] == "X" 
                || cells[possibleX][possibleY] == "O" 
                || (turnNumber == 2 && (possibleX + possibleY) % 2 != 0) // the second turn only through the center or diagonals
            );
            
            makeTurn(possibleX, possibleY);
        }
    }
}

