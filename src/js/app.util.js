/* global cols */

const COLOR_TYPE = [
    "#000",
    "#f00",
    "#0f0",
    "#00f"];

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
    ]
};

class Block {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotateIdx = 0;
        this.cells = BLOCK_TYPE.TYPE2[0];
        this.rotateType = 0;
        this.blockType = 1;
    }

    rotate() {
        this.rotateIdx = (this.rotateIdx + 1) % 4;
        this.cells = BLOCK_TYPE.TYPE2[this.rotateIdx];
    }

    right() {
        const able = this.cells.reduce((p, c, i) => {
            // console.log(this.x+this.y*cols+Math.floor(i/4)+(i%4));
            // 오른쪽 벽에 붙으면 더이상 가지않음 
            // if( c !== 0 && this.x + (i % 4) > cols) 
            return p && !(c !== 0 && this.x + (i % 4) === cols-1);
        }, true);
        if (able) this.x += 1;
    }

    left() {
        const able = this.cells.reduce((p, c, i) => {
            // console.log(this.x+this.y*cols+Math.floor(i/4)+(i%4));
            // 오른쪽 벽에 붙으면 더이상 가지않음 
            // if( c !== 0 && this.x + (i % 4) > cols) 
            return p && !(c !== 0 && this.x + (i % 4) === 0);
        }, true);
        if (able) this.x -= 1;
    }

    update() {
        this.y += 1;
    }
}