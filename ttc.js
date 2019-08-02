const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const fieldImg = new Image();
const xImg = new Image();
const oImg = new Image();
const box = 96; // square size (pxl)
let cells = [
    ["[0][0]", "[0][1]", "[0][2]"],
    ["[1][0]","[1][1]", "[1][2]"],
    ["[2][0]", "[2][1]", "[2][2]"]
  ];

fieldImg.src = "images/field.png";
xImg.src = "images/X.png";
oImg.src = "images/O.png";

canvas.addEventListener("click", updateField);

function updateField(event) {
    //context.drawImage(fieldImg, 0, 0);
    let cell;
    let click = {
        x: event.offsetX,
        y: event.offsetY
    };

    if (click.x > 192 && click.x < 288 && click.y > 192 && click.y < 288) cell = cells[0][0];
    else if (click.x > 288 && click.x < 384 && click.y > 192 && click.y < 288) cell = cells[0][1];
    else if (click.x > 384 && click.x < 480 && click.y > 192 && click.y < 288) cell = cells[0][2];
    else if (click.x > 192 && click.x < 288 && click.y > 288 && click.y < 384) cell = cells[1][0];
    else if (click.x > 288 && click.x < 384 && click.y > 288 && click.y < 384) cell = cells[1][1];
    else if (click.x > 384 && click.x < 480 && click.y > 288 && click.y < 384) cell = cells[1][2];
    else if (click.x > 192 && click.x < 288 && click.y > 384 && click.y < 480) cell = cells[2][0];
    else if (click.x > 288 && click.x < 384 && click.y > 384 && click.y < 480) cell = cells[2][1];
    else if (click.x > 384 && click.x < 480 && click.y > 384 && click.y < 480) cell = cells[2][2];
    else return;
    alert(cell);
}

