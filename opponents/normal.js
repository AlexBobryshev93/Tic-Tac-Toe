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