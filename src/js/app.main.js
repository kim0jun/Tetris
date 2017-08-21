/* global BLOCK_TYPE COLOR_TYPE Block */


const STAGE_WIDTH = 360;
const STAGE_HEIGHT = 600;
const scl = 20;
const rows = STAGE_HEIGHT / scl;
const cols = STAGE_WIDTH / scl;
let cells = [];


let canvas;
let ctx;
let block;

document.addEventListener("DOMContentLoaded", () => {
    console.log("ready");
    setup();
    addEventHandler();
    draw();
});

function setup() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    canvas.setAttribute("width", STAGE_WIDTH);
    canvas.setAttribute("height", STAGE_HEIGHT);

    document.querySelector("body").appendChild(canvas);

    for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
            cells.push(0);
        }
    }

    block = new Block();
}

function addEventHandler() {
    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        switch (e.code) {
        case "ArrowUp" : block.rotate(); break;
        case "ArrowDown" : block.rotate(); break;
        case "ArrowLeft" : block.left(); break;
        case "ArrowRight" : block.right(); break;
        default : console.log("not defiend event key"); break;
        }
    });
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.fill();

    const cellImg = cells.slice();


    let stop = false;
    for (let i = 0; i < block.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(block.x, block.y, i);
        cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];

        if (block.cells[i] !== 0 &&
            cellImg[mapCellIdx + cols] !== 0) stop = true;
    }

    for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
            const cellType = cellImg[x + (y * cols)];
            ctx.beginPath();
            ctx.rect(x * scl, y * scl, scl, scl);
            ctx.strokeStyle = cellType === 0 ? "#fff" : "#000";
            ctx.fillStyle = COLOR_TYPE[cellType];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
    if (!stop) {
        block.update();
    } else {
        cells = cellImg.slice();
        initBlock();
    }

    setTimeout(draw, 200);
}

function getCellIdx($blockX, $blockY, $cellIdx) {
    const idx = $blockX + ($blockY * cols) + (Math.floor($cellIdx / 4) * cols) + ($cellIdx % 4);
    return idx;
}

function initBlock() {
    block = new Block();
}
