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

            if (cellType !== 0) drawDetail(x * scl, y * scl);
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

// 맵핑은 

function maping() {
    // stop  = 블록의 셀이 공백이아니고, 맵의 셀 또한 공백이아니면 멈춘다 이때 맵 이미지는 이전 맵핑때 사용한 이미지를 사용한다.

    let stop = false;
    const cellImg = absCells.slice();
    for (let i = 0; i < block.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(block.x, block.y, i);

        if (block.cells[i] !== 0 &&
            cellImg[mapCellIdx] !== 0) stop = true;

        if (mapCellIdx < cells.length) cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];
    }
    if (stop) {
        absCells = cells.slice();
        checkClear();
        initBlock();
    } else {
        cells = cellImg.slice();
    }
}

function preview() {
    if (!previewBlock) return;
    previewBlock.copyPosition(block);

    // 내려갈수 있는만큼 내려간다.
    let stop = false;
    while (!stop) {
        previewBlock.down();
        for (let i = 0; i < previewBlock.cells.length; i += 1) {
            const mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, i);
            if (previewBlock.cells[i] !== 0 &&
                absCells[mapCellIdx + cols] !== 0) stop = true;
        }
    }

    // 내려가서 맵핑한다 ( 해당셀에 이미 블록이 차있다면 그리지 않는다.)
    for (let i = 0; i < previewBlock.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, i);
        if (previewBlock.cells[i] !== 0 && cells[mapCellIdx] === 0) {
            ctx.beginPath();
            ctx.rect((mapCellIdx % cols) * scl, Math.floor(mapCellIdx / cols) * scl, scl, scl);
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#777";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawDetail($xPostion, $yPostion) {
    // 저장
    ctx.save();
    ctx.translate($xPostion, $yPostion);
    // 위쪽면
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(scl, 0);
    ctx.lineTo(scl * (8 / 10), scl * (2 / 10));
    ctx.lineTo(scl * (2 / 10), scl * (2 / 10));
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fill();
    // 우측면
    ctx.beginPath();
    ctx.moveTo(scl, 0);
    ctx.lineTo(scl, scl);
    ctx.lineTo(scl * (8 / 10), scl * (8 / 10));
    ctx.lineTo(scl * (8 / 10), scl * (2 / 10));
    ctx.lineTo(scl, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fill();
    // 하측면
    ctx.beginPath();
    ctx.moveTo(scl, scl);
    ctx.lineTo(0, scl);
    ctx.lineTo(scl * (2 / 10), scl * (8 / 10));
    ctx.lineTo(scl * (8 / 10), scl * (8 / 10));
    ctx.lineTo(scl, scl);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();
    // 왼쪽면
    ctx.beginPath();
    ctx.moveTo(0, scl);
    ctx.lineTo(0, 0);
    ctx.lineTo(scl * (2 / 10), scl * (2 / 10));
    ctx.lineTo(scl * (2 / 10), scl * (8 / 10));
    ctx.lineTo(0, scl);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fill();
    // 복구
    ctx.restore();
}

function forceLand() {
    block.copyPosition(previewBlock);

    // FIXME: 수정해야함 강제로 내렸을경우, maping 함수와 충돌로 인해서 아래 코드를 실행해야만 올바르게 작동함.
    // -- start
    const cellImg = absCells.slice();
    for (let i = 0; i < block.cells.length; i += 1) {
        const mapCellIdx = getCellIdx(block.x, block.y, i);
        if (mapCellIdx < cells.length) cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];
    }
    cells = cellImg.slice();
    // -- end
    block.down();
    maping();
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
/**
 * getCellIdx() returns a cell idx
 * get a index block cell in map cells
 *
 * @param {Number} $blockX
 * @param {Number} $blockY
 * @param {Number} $cellIdx
 * @return {Element} element
 */
function getCellIdx($blockX, $blockY, $cellIdx) {
    const idx = $blockX + ($blockY * cols) + (Math.floor($cellIdx / 4) * cols) + ($cellIdx % 4);
    return idx;
}

function initBlock() {
    block = new Block();
    previewBlock = new Block(block.x, block.y, block.blockType, block.rotateIdx);
}
