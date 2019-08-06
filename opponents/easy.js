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