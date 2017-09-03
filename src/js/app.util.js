/* global cols */

const COLOR_TYPE = [
    "#000",
    "#f00",
    "#0f0",
    "#00f",
    "#f0f",
    "#ff0"];

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
};

class Block {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotateIdx = 0;
        this.rotateType = 0;
        this.blockType = Math.floor(Math.random() * 5) + 1;
        this.cells = BLOCK_TYPE[`TYPE${this.blockType}`][this.rotateIdx];
    }

    rotate() {
        this.rotateIdx = (this.rotateIdx + 1) % 4;
        this.cells = BLOCK_TYPE[`TYPE${this.blockType}`][this.rotateIdx];

        let rightOver = false;
        let leftOver = false;
        while (!rightOver || !leftOver ) {
            leftOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === cols), true);
            rightOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === -1), true);
            if (!leftOver) this.x -= 1;
            if (!rightOver) this.x += 1;
        }
    }

    right() {
        const able = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === cols - 1), true);
        if (able) this.x += 1;
    }

    left() {
        const able = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.x + (i % 4) === 0), true);
        if (able) this.x -= 1;
    }

    update() {
        this.y += 1;
    }
}
