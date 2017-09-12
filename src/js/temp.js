"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
        URL 관련 유틸 
        ARUtils.isLocal()               = 로컬 확인
        ARUtils.getDomain()             = 현재 도메인 가져오기기
        ARUtils.getUrlVars()            = URL get방식 변수 오브젝트 가져오기
        ARUtils.getUrlVar($name)        = URL get방식 특정이름 변수값 가져오기

        디버깅 유틸
        ARUtils.log()                  = 로그찍기   (product = false 일때만 실행)
        ARUtils.warn()                 = 경고찍기   (product = false 일때만 실행)        

        브라우저 관련 유틸
        ARUtils.getIEVersion()          = 익스플로러 버전 가져오기     ( 999 리턴시 익스플로러 아님 )
        ARUtils.isIELow()               = 익스플로러 하위버전크체크     ( 8이하 )
        ARUtils.isDevice()              = 디바이스 체크 
        ARUtils.isIOS()                 = iOS 체크 
        ARUtils.isAndroid()             = 안드로이드 체크
        ARUtils.isInApp()               = 인앱 브라우저 체크 

        쿠키 유틸
        ARUtils.setCookie($name, $value)    = 한글 이름 유효성검사
        ARUtils.getCookie($c_name)          = 한국 휴대폰번호 유효성검사 

        문자열 유효성검사 유틸
        ARUtils.isValidUserName()           = 한글 이름 유효성검사
        ARUtils.isValidUserPhone()          = 한국 휴대폰번호 유효성검사 
*/

var ARUtils = function () {
    function ARUtils($params) {
        _classCallCheck(this, ARUtils);

        this.product = $params && $params.product ? $params.product : false;
    }

    _createClass(ARUtils, [{
        key: "isLocal",
        value: function isLocal() {
            return window.location.href.indexOf("C://") > -1 || window.location.href.indexOf("file://") > -1 || window.location.href.indexOf("localhost") > -1;
        }
    }, {
        key: "getDomain",
        value: function getDomain() {
            return this.isLocal() ? "localhost" : document.location.href.match(/http[s]*:\/\/([a-zA-Z0-9\-\.]*)/)[1];
        }
    }, {
        key: "getUrlVars",
        value: function getUrlVars() {
            var vars = {};
            var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
            hashes.forEach(function (hash) {
                return vars[hash.split("=")[0]] = hash.split("=")[1];
            });
            return vars;
        }
    }, {
        key: "getUrlVar",
        value: function getUrlVar($name) {
            return this.getUrlVars()[$name];
        }
    }, {
        key: "log",
        value: function log($o) {
            if (this.product) return;
            if (window.console && window.console.log.apply) {
                console.log($o);
            } else if (window.console) {
                console.log($o);
            }
        }
    }, {
        key: "warn",
        value: function warn($o) {
            if (this.product) return;
            if (window.console && window.console.warn.apply) {
                console.warn($o);
            } else if (window.console) {
                console.warn($o);
            }
        }
    }, {
        key: "getIEVersion",
        value: function getIEVersion() {
            if (navigator.appVersion.indexOf("MSIE") > -1) {
                var _tri = "Trident/";
                var _idx = navigator.appVersion.indexOf("Trident/");
                var _tridentVer = void 0;
                var _exploerVer = void 0;

                if (_idx > -1) {
                    _tridentVer = navigator.appVersion.charAt(_idx + _tri.length);
                }

                switch (Number(_tridentVer)) {
                    case 4:
                        _exploerVer = 8;break;
                    case 5:
                        _exploerVer = 9;break;
                    case 6:
                        _exploerVer = 10;break;
                    case 7:
                        _exploerVer = 11;break;
                    default:
                        _exploerVer = 7;break;
                }
                return _exploerVer;
            }
            return 999;
        }
    }, {
        key: "isIELow",
        value: function isIELow() {
            return this.getIEVersion() < 9;
        }
    }, {
        key: "isDevice",
        value: function isDevice() {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            );
        }
    }, {
        key: "isIOS",
        value: function isIOS() {
            return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
            );
        }
    }, {
        key: "isAndroid",
        value: function isAndroid() {
            return (/Android/i.test(navigator.userAgent)
            );
        }
    }, {
        key: "isInApp",
        value: function isInApp() {
            return false;
        }
    }, {
        key: "setCookie",
        value: function setCookie($name, $value, $exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + $exdays);
            var cValue = escape($value) + ($exdays == null ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = $name + "=" + cValue;
        }
    }, {
        key: "getCookie",
        value: function getCookie($name) {
            var _value = null;
            document.cookie.split(";").forEach(function (cookie) {
                if (cookie.substr(0, cookie.indexOf("=")).replace(/^\s+|\s+$/g, "") == $name) {
                    _value = unescape(cookie.substr(cookie.indexOf("=") + 1));
                }
            });
            return _value;
        }
    }, {
        key: "isValidUserName",
        value: function isValidUserName($name) {
            return (/^[가-힣]{2,8}$/.test($name)
            );
        }
    }, {
        key: "isValidUserPhone",
        value: function isValidUserPhone($number) {
            return (/^01([016789])([1-9]{1})([0-9]{2,3})([0-9]{4})$/.test($number)
            );
        }
    }]);

    return ARUtils;
}();
'use strict';

// //==========================================================================================================================================================
/*      
       String format methode 삽입 
       "{0} 다음 {1}".format("첫번째","두번째")   =  "첫번째 다음 두번째" 

*/
// //==========================================================================================================================================================

String.prototype.format = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    console.log(args);
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global cols rows absCells */

var COLOR_TYPE = ["#000", "#f00", "#0f0", "#00f", "#f0f", "#ff0", "#0ff", "#3f7"];

var BLOCK_TYPE = {
    TYPE1: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0]],
    TYPE2: [[0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0]],
    TYPE3: [[0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0]],
    TYPE4: [[0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0], [0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 0, 0]],
    TYPE5: [[0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 0], [0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0], [0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0]],
    TYPE6: [[0, 0, 0, 0, 0, 0, 6, 0, 0, 6, 6, 0, 0, 6, 0, 0], [0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 6, 6, 0, 0, 0, 0], [0, 0, 6, 0, 0, 6, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 6, 6, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0]],
    TYPE7: [[0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 7, 0, 0, 7, 0], [0, 0, 0, 0, 0, 0, 7, 0, 0, 7, 7, 7, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 7, 0, 0, 7, 7, 0, 0, 0, 7, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 7, 0]]
};

var Block = function () {
    function Block(x, y, blockType, rotateIdx) {
        _classCallCheck(this, Block);

        this.x = x || Math.floor(Math.random() * (cols - 4));
        this.y = y || 0;
        this.blockType = blockType || Math.floor(Math.random() * 7) + 1;
        this.rotateIdx = rotateIdx || Math.floor(Math.random() * 4);
        this.cells = BLOCK_TYPE["TYPE" + this.blockType][this.rotateIdx];

        this.getCellIdx = function ($blockX, $blockY, $cellIdx) {
            return $blockX + $blockY * cols + Math.floor($cellIdx / 4) * cols + $cellIdx % 4;
        };
    }

    // 돌리고 -> 불가능하면 위치조정


    _createClass(Block, [{
        key: "rotate",
        value: function rotate() {
            this.rotateIdx = (this.rotateIdx + 1) % 4;
            this.cells = BLOCK_TYPE["TYPE" + this.blockType][this.rotateIdx];
            this.correction();
        }
    }, {
        key: "left",
        value: function left() {
            if (!this.simulrateMove(true)) return;
            this.x -= 1;
            this.correction();
        }
    }, {
        key: "right",
        value: function right() {
            if (!this.simulrateMove(false)) return;
            this.x += 1;
            this.correction();
        }
    }, {
        key: "down",
        value: function down() {
            this.y += 1;
            this.correction();
        }
    }, {
        key: "copyPosition",
        value: function copyPosition(block) {
            this.x = block.x;
            this.y = block.y;
            this.rotateIdx = block.rotateIdx;
            this.cells = BLOCK_TYPE["TYPE" + this.blockType][this.rotateIdx];
        }

        // 영역 보정

    }, {
        key: "correction",
        value: function correction() {
            var _this = this;

            var rightOver = false;
            var leftOver = false;
            // let downOver = false;
            while (!rightOver || !leftOver) {
                leftOver = this.cells.reduce(function (p, c, i) {
                    return p && !(c !== 0 && _this.x + i % 4 === cols);
                }, true);
                rightOver = this.cells.reduce(function (p, c, i) {
                    return p && !(c !== 0 && _this.x + i % 4 === -1);
                }, true);
                // downOver = this.cells.reduce((p, c, i) => p && !(c !== 0 && this.y + Math.floor(i / 4) >= rows), true);
                if (!leftOver) this.x -= 1;
                if (!rightOver) this.x += 1;
                // if (!downOver) this.y -= 1;
            }
        }
    }, {
        key: "simulrateMove",
        value: function simulrateMove($left) {
            var able = true;
            var nextX = $left ? this.x - 1 : this.x + 1;
            for (var i = 0; i < this.cells.length; i += 1) {
                var mapCellIdx = this.getCellIdx(nextX, this.y, i);
                if (absCells[mapCellIdx] !== 0 && this.cells[i] !== 0) able = false;
            }

            return able;
        }
    }]);

    return Block;
}();
"use strict";

/* global BLOCK_TYPE COLOR_TYPE Block */

var STAGE_WIDTH = 240;
var STAGE_HEIGHT = 460;
var UI_WIDTH = 100;
var scl = 20;
var rows = STAGE_HEIGHT / scl + 4;
var cols = STAGE_WIDTH / scl;
var cells = [];
var absCells = [];
var nextBlocks = [];

var canvas = void 0;
var ctx = void 0;
var block = void 0;
var previewBlock = void 0;

document.addEventListener("DOMContentLoaded", function () {
    setup();
    addEventHandler();
    update();
    draw();
});

function setup() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    canvas.setAttribute("width", STAGE_WIDTH + UI_WIDTH);
    canvas.setAttribute("height", STAGE_HEIGHT);

    document.querySelector("body").appendChild(canvas);

    for (var y = 0; y < rows; y += 1) {
        for (var x = 0; x < cols; x += 1) {
            cells.push(0);
            absCells.push(0);
        }
    }

    for (var i = 0; i < 5; i += 1) {
        nextBlocks.push(new Block());
    }
    nextBlock();
}

function addEventHandler() {
    document.addEventListener("keydown", function (e) {
        switch (e.code) {
            case "ArrowUp":
                block.rotate();maping();e.preventDefault();break;
            case "ArrowDown":
                block.down();maping();e.preventDefault();break;
            case "ArrowLeft":
                block.left();
                maping();
                e.preventDefault();break;
            case "ArrowRight":
                block.right();
                maping();
                e.preventDefault();break;
            case "Space":
                forceLand();
                maping();
                e.preventDefault();break;
            default:
                console.log("not defiend event key : " + e.code);break;
        }
    });
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.rect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.fill();

    // 셀을 그린다 .
    for (var y = 0; y < rows - 4; y += 1) {
        for (var x = 0; x < cols; x += 1) {
            var cellType = cells[x + (y + 4) * cols];
            ctx.beginPath();
            ctx.rect(x * scl, y * scl, scl, scl);
            ctx.fillStyle = COLOR_TYPE[cellType];
            ctx.fill();
            ctx.closePath();
            if (cellType !== 0) {
                drawDetail(x * scl, y * scl);
            } else {
                ctx.strokeStyle = "rgba(255,255,255,0.6)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    preview();

    setTimeout(draw, 40);
}

function uiDraw() {
    ctx.beginPath();
    ctx.font = "22px Verdana";
    ctx.fillStyle = "#000";
    ctx.fillText("NEXT", STAGE_WIDTH + 30, 30);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#000";
    ctx.rect(STAGE_WIDTH + 20, 50, 80, 80);
    ctx.rect(STAGE_WIDTH + 20, 150, 80, 300);
    ctx.fill();

    // 바로 다음 블럭
    var left = 4;
    var right = 0;
    var top = 4;
    var bottom = 0;
    for (var i = 0; i < nextBlocks[0].cells.length; i += 1) {
        var x = i % 4;
        var y = Math.floor(i / 4);
        if (nextBlocks[0].cells[i] !== 0) {
            left = Math.min(left, x);
            right = Math.max(right, x);
            top = Math.min(top, y);
            bottom = Math.max(bottom, y);
        }
    }

    for (var _i = 0; _i < nextBlocks[0].cells.length; _i += 1) {
        var _x = _i % 4 * scl + (STAGE_WIDTH + 20) + (4 - (right + left + 1)) / 2 * scl;
        var _y = Math.floor(_i / 4) * scl + 50 + (4 - (bottom + top + 1)) / 2 * scl;
        if (nextBlocks[0].cells[_i] !== 0) {
            ctx.beginPath();
            ctx.rect(_x, _y, scl, scl);
            ctx.fillStyle = COLOR_TYPE[nextBlocks[0].cells[_i]];
            ctx.fill();
            ctx.closePath();
            drawDetail(_x, _y);
        }
    }
}

function update() {
    block.down();
    maping();

    setTimeout(update, 600);
}

// 맵핑은 

function maping() {
    // stop  = 블록의 셀이 공백이아니고, 맵의 셀 또한 공백이아니면 멈춘다 이때 맵 이미지는 이전 맵핑때 사용한 이미지를 사용한다.

    var stop = false;
    var cellImg = absCells.slice();
    for (var i = 0; i < block.cells.length; i += 1) {
        var mapCellIdx = getCellIdx(block.x, block.y, i);

        if (block.cells[i] !== 0 && cellImg[mapCellIdx] !== 0) stop = true;

        if (mapCellIdx < cells.length) cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];
    }
    if (stop) {
        absCells = cells.slice();
        checkClear();
        checkGameover();
        nextBlock();
    } else {
        cells = cellImg.slice();
    }
}

function preview() {
    if (!previewBlock) return;
    previewBlock.copyPosition(block);

    // 내려갈수 있는만큼 내려간다.
    var stop = false;
    while (!stop) {
        previewBlock.down();
        for (var i = 0; i < previewBlock.cells.length; i += 1) {
            var mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, i);
            if (previewBlock.cells[i] !== 0 && absCells[mapCellIdx + cols] !== 0) stop = true;
        }
    }

    // 내려가서 맵핑한다 ( 해당셀에 이미 블록이 차있다면 그리지 않는다.)
    for (var _i2 = 0; _i2 < previewBlock.cells.length; _i2 += 1) {
        var _mapCellIdx = getCellIdx(previewBlock.x, previewBlock.y, _i2);
        if (previewBlock.cells[_i2] !== 0 && cells[_mapCellIdx] === 0) {
            ctx.beginPath();
            ctx.rect(_mapCellIdx % cols * scl, (Math.floor(_mapCellIdx / cols) - 4) * scl, scl, scl);
            ctx.strokeStyle = "#000";
            ctx.fillStyle = "#777";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
    }
}

/**
 * drawDetail() draw block detail
 * 블록에 입체감을 준다.
 *
 * @param {Number} $xPostion
 * @param {Number} $yPostion
 * @return void
 */
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
    var cellImg = absCells.slice();
    for (var i = 0; i < block.cells.length; i += 1) {
        var mapCellIdx = getCellIdx(block.x, block.y, i);
        if (mapCellIdx < cells.length) cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];
    }
    cells = cellImg.slice();
    // -- end
    block.down();
    maping();
}

function checkClear() {
    var clearArr = [];
    for (var y = 0; y < rows; y += 1) {
        var isClear = true;
        for (var x = 0; x < cols; x += 1) {
            isClear = isClear && absCells[y * cols + x] !== 0;
        }
        if (isClear) clearArr.push(y);
    }

    for (var i = 0; i < clearArr.length; i += 1) {
        var row = clearArr[i];
        var firstCell = row * cols;
        var lastCell = (row + 1) * cols;
        absCells = absCells.slice(0, firstCell).concat(absCells.slice(lastCell, absCells.length));
        var blankArr = [];
        for (var k = 0; k < cols; k += 1) {
            blankArr.push(0);
        }
        absCells = blankArr.concat(absCells);
    }
}

function checkGameover() {
    var isGameOver = false;
    for (var y = 0; y < rows; y += 1) {
        for (var x = 0; x < cols; x += 1) {
            if (absCells[y * cols + x] !== 0 && y * cols + x < 5 * cols) isGameOver = true;
        }
    }
    if (isGameOver) {
        absCells = absCells.map(function (v) {
            return 0;
        });
        cells = absCells.slice();
        console.log("game over");
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
    var idx = $blockX + $blockY * cols + Math.floor($cellIdx / 4) * cols + $cellIdx % 4;
    return idx;
}

function nextBlock() {
    block = nextBlocks[0];
    nextBlocks = nextBlocks.slice(1, nextBlocks.length);
    nextBlocks.push(new Block());
    previewBlock = new Block(block.x, block.y, block.blockType, block.rotateIdx);
    uiDraw();
}