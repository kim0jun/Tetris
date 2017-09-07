/* global cols rows absCells */

const COLOR_TYPE = [
    "#000",
    "#f00",
    "#0f0",
    "#00f",
    "#f0f",
    "#ff0",
    "#0ff",
    "#3f7"];

const BLOCK_TYPE = {
    TYPE1: [
        [
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 0, 1, 0,
            1, 1, 1, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 1, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0],
        [
            0, 0, 0, 0,
            0, 1, 1, 1,
            0, 1, 0, 0,
            0, 0, 0, 0],
    ],
    TYPE2: [
        [
            0, 0, 2, 0,
            0, 0, 2, 0,
            0, 2, 2, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            2, 2, 2, 0,
            0, 0, 2, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 2, 2, 0,
            0, 2, 0, 0,
            0, 2, 0, 0],
        [
            0, 0, 0, 0,
            0, 2, 0, 0,
            0, 2, 2, 2,
            0, 0, 0, 0],
    ],
    TYPE3: [
        [
            0, 0, 0, 0,
            0, 3, 3, 0,
            0, 3, 3, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 3, 3, 0,
            0, 3, 3, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 3, 3, 0,
            0, 3, 3, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 3, 3, 0,
            0, 3, 3, 0,
            0, 0, 0, 0],
    ],
    TYPE4: [
        [
            0, 0, 4, 0,
            0, 0, 4, 0,
            0, 0, 4, 0,
            0, 0, 4, 0],
        [
            0, 0, 0, 0,
            4, 4, 4, 4,
            0, 0, 0, 0,
            0, 0, 0, 0],
        [
            0, 4, 0, 0,
            0, 4, 0, 0,
            0, 4, 0, 0,
            0, 4, 0, 0],
        [
            0, 0, 0, 0,
            0, 0, 0, 0,
            4, 4, 4, 4,
            0, 0, 0, 0],
    ],
    TYPE5: [
        [
            0, 0, 0, 0,
            0, 5, 0, 0,
            0, 5, 5, 0,
            0, 0, 5, 0],
        [
            0, 0, 0, 0,
            0, 0, 5, 5,
            0, 5, 5, 0,
            0, 0, 0, 0],
        [
            0, 5, 0, 0,
            0, 5, 5, 0,
            0, 0, 5, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 5, 5, 0,
            5, 5, 0, 0,
            0, 0, 0, 0],
    ],
    TYPE6: [
        [
            0, 0, 0, 0,
            0, 0, 6, 0,
            0, 6, 6, 0,
            0, 6, 0, 0],
        [
            0, 0, 0, 0,
            0, 6, 6, 0,
            0, 0, 6, 6,
            0, 0, 0, 0],
        [
            0, 0, 6, 0,
            0, 6, 6, 0,
            0, 6, 0, 0,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            6, 6, 0, 0,
            0, 6, 6, 0,
            0, 0, 0, 0],
    ],
    TYPE7: [
        [
            0, 0, 0, 0,
            0, 0, 7, 0,
            0, 0, 7, 7,
            0, 0, 7, 0],
        [
            0, 0, 0, 0,
            0, 0, 7, 0,
            0, 7, 7, 7,
            0, 0, 0, 0],
        [
            0, 0, 0, 0,
            0, 0, 7, 0,
            0, 7, 7, 0,
            0, 0, 7, 0],
        [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 7, 7, 7,
            0, 0, 7, 0],
    ]
};

class Block {
    constructor(x, y, blockType, rotateIdx) {
        this.x = x || Math.floor(Math.random() * (cols - 4));
        this.y = y || 0;
        this.blockType = blockType || Math.floor(Math.random() * 7) + 1;
        this.rotateIdx = rotateIdx || 0;
        this.cells = BLOCK_TYPE[`TYPE${this.blockType}`][this.rotateIdx];

        this.getCellIdx = ($blockX, $blockY, $cellIdx) =>  $blockX + ($blockY * cols) + (Math.floor($cellIdx / 4) * cols) + ($cellIdx % 4);
    }

    // 돌리고 -> 불가능하면 위치조정
    rotate() {
        this.rotateIdx = (this.rotateIdx + 1) % 4;
        this.cells = BLOCK_TYPE[`TYPE${this.blockType}`][this.rotateIdx];
        this.correction();
    }

    left() {
        if (!this.simulrateMove(true)) return;
        this.x -= 1;
        this.correction();
    }

    right() {
        if (!this.simulrateMove(false)) return;
        this.x += 1;
        this.correction();
    }

    down() {
        this.y += 1;
        this.correction();
    }

    copyPosition(block) {
        this.x = block.x;
        this.y = block.y;
        this.rotateIdx = block.rotateIdx;
        this.cells = BLOCK_TYPE[`TYPE${this.blockType}`][this.rotateIdx];
    }

    // 영역 보정
    correction() {
        let rightOver = false;
        let leftOver = false;
        // let downOver = false;
        while (!rightOver || !leftOver) {
            leftOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === cols), true);
            rightOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === -1), true);
            // downOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.y + Math.floor(i / 4) >= rows), true);
            if (!leftOver) this.x -= 1;
            if (!rightOver) this.x += 1;
            // if (!downOver) this.y -= 1;
        }
    }

    simulrateMove($left) {
        let able = true;
        const nextX = $left ? this.x - 1 : this.x + 1;
        for (let i = 0; i < this.cells.length; i += 1) {
            const mapCellIdx = this.getCellIdx(nextX, this.y, i);
            if (absCells[mapCellIdx] !== 0 &&
                this.cells[i] !== 0) able = false;
        }

        return able;
    }
}
