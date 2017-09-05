/* global BLOCK_TYPE COLOR_TYPE Block */


const STAGE_WIDTH = 240;
const STAGE_HEIGHT = 460;
const scl = 20;
const rows = STAGE_HEIGHT / scl;
const cols = STAGE_WIDTH / scl;
let cells = [];
let absCells = [];


let canvas;
let ctx;
let block;
let previewBlock;

document.addEventListener("DOMContentLoaded", () => {
    console.log("ready");
    setup();
    addEventHandler();
    update();
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
            absCells.push(0);
        }
    }

    initBlock();
}

function addEventHandler() {
    document.addEventListener("keydown", (e) => {
        switch (e.code) {
        case "ArrowUp" : block.rotate(); maping(); e.preventDefault(); break;
        case "ArrowDown" : block.down(); maping(); e.preventDefault(); break;
        case "ArrowLeft" :
            block.left();
            maping();
            e.preventDefault(); break;
        case "ArrowRight" :
            block.right();
            maping();
            e.preventDefault(); break;
        case "Space" :
            forceLand();
            maping();
            e.preventDefault(); break;
        default : console.log(`not defiend event key : ${e.code}`); break;
        }
    });
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.fill();

    // 셀을 그린다 .
    for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
            const cellType = cells[x + (y * cols)];
            ctx.beginPath();
            ctx.rect(x * scl, y * scl, scl, scl);
            ctx.strokeStyle = cellType === 0 ? "#fff" : "#000";
            ctx.fillStyle = COLOR_TYPE[cellType];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }

    preview();

    setTimeout(draw, 40);
}

function update() {
    block.down();
    maping();

    setTimeout(update, 600);
}

function maping() {
    let stop = false;
    const cellImg = absCells.slice();
    for (let i = 0; i < block.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(block.x, block.y, i);

        if (block.cells[i] !== 0 &&
            cellImg[mapCellIdx + cols] !== 0) stop = true;

        if (mapCellIdx < cells.length) cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];
    }
    if (stop) {
        absCells = cellImg.slice();
        checkClear();
        initBlock();
    } else {
        cells = cellImg.slice();
    }
}

function preview() {
    if (!previewBlock) return;
    previewBlock.copyPosition(block);
    let stop = false;
    while (!stop) {
        previewBlock.down();
        for (let i = 0; i < previewBlock.cells.length; i += 1) {
            const mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, i);
            if (previewBlock.cells[i] !== 0 &&
                absCells[mapCellIdx + cols] !== 0) stop = true;
        }
    }

    for (let i = 0; i < previewBlock.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, i);
        if (previewBlock.cells[i] !== 0) {
            ctx.beginPath();
            ctx.rect((mapCellIdx % cols) * scl, Math.floor(mapCellIdx / cols) * scl, scl, scl);
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#ddd";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
}

function forceLand() {
    block.copyPosition(previewBlock);
}


function checkClear() {
    const clearArr = [];
    for (let y = 0; y < rows; y += 1) {
        let isClear = true;
        for (let x = 0; x < cols; x += 1) {
            isClear = isClear && absCells[(y * cols) + x] !== 0;
        }
        if (isClear) clearArr.push(y);
    }

    for (let i = 0; i < clearArr.length; i += 1) {
        const row = clearArr[i];
        const firstCell = row * cols;
        const lastCell = (row + 1) * cols;
        absCells = absCells.slice(0, firstCell).concat(absCells.slice(lastCell, absCells.length));
        const blankArr = [];
        for (let k = 0; k < cols; k += 1) {
            blankArr.push(0);
        }
        absCells = blankArr.concat(absCells);
    }
}

function getCellIdx($blockX, $blockY, $cellIdx) {
    const idx = $blockX + ($blockY * cols) + (Math.floor($cellIdx / 4) * cols) + ($cellIdx % 4);
    return idx;
}

function initBlock() {
    block = new Block();
    previewBlock = new Block(block.x, block.y, block.blockType, block.rotateIdx);
}
