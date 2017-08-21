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

/* global cols */

var COLOR_TYPE = ["#000", "#f00", "#0f0", "#00f"];

var BLOCK_TYPE = {
    TYPE1: [[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0]],
    TYPE2: [[0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0]]
};

var Block = function () {
    function Block() {
        _classCallCheck(this, Block);

        this.x = 0;
        this.y = 0;
        this.rotateIdx = 0;
        this.cells = BLOCK_TYPE.TYPE2[0];
        this.rotateType = 0;
        this.blockType = 1;
    }

    _createClass(Block, [{
        key: "rotate",
        value: function rotate() {
            this.rotateIdx = (this.rotateIdx + 1) % 4;
            this.cells = BLOCK_TYPE.TYPE2[this.rotateIdx];
        }
    }, {
        key: "right",
        value: function right() {
            var _this = this;

            var able = this.cells.reduce(function (p, c, i) {
                // console.log(this.x+this.y*cols+Math.floor(i/4)+(i%4));
                // 오른쪽 벽에 붙으면 더이상 가지않음 
                // if( c !== 0 && this.x + (i % 4) > cols) 
                return p && !(c !== 0 && _this.x + i % 4 === cols - 1);
            }, true);
            if (able) this.x += 1;
        }
    }, {
        key: "left",
        value: function left() {
            var _this2 = this;

            var able = this.cells.reduce(function (p, c, i) {
                // console.log(this.x+this.y*cols+Math.floor(i/4)+(i%4));
                // 오른쪽 벽에 붙으면 더이상 가지않음 
                // if( c !== 0 && this.x + (i % 4) > cols) 
                return p && !(c !== 0 && _this2.x + i % 4 === 0);
            }, true);
            if (able) this.x -= 1;
        }
    }, {
        key: "update",
        value: function update() {
            this.y += 1;
        }
    }]);

    return Block;
}();
"use strict";

/* global BLOCK_TYPE COLOR_TYPE Block */

var STAGE_WIDTH = 360;
var STAGE_HEIGHT = 600;
var scl = 20;
var rows = STAGE_HEIGHT / scl;
var cols = STAGE_WIDTH / scl;
var cells = [];

var canvas = void 0;
var ctx = void 0;
var block = void 0;

document.addEventListener("DOMContentLoaded", function () {
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

    for (var y = 0; y < rows; y += 1) {
        for (var x = 0; x < cols; x += 1) {
            cells.push(0);
        }
    }

    block = new Block();
}

function addEventHandler() {
    document.addEventListener("keydown", function (e) {
        e.preventDefault();
        switch (e.code) {
            case "ArrowUp":
                block.rotate();break;
            case "ArrowDown":
                block.rotate();break;
            case "ArrowLeft":
                block.left();break;
            case "ArrowRight":
                block.right();break;
            default:
                console.log("not defiend event key");break;
        }
    });
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.rect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.fill();

    var cellImg = cells.slice();

    var stop = false;
    for (var i = 0; i < block.cells.length; i += 1) {
        var mapCellIdx = getCellIdx(block.x, block.y, i);
        cellImg[mapCellIdx] = cellImg[mapCellIdx] || block.cells[i];

        if (block.cells[i] !== 0 && cellImg[mapCellIdx + cols] !== 0) stop = true;
    }

    for (var y = 0; y < rows; y += 1) {
        for (var x = 0; x < cols; x += 1) {
            var cellType = cellImg[x + y * cols];
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
    var idx = $blockX + $blockY * cols + Math.floor($cellIdx / 4) * cols + $cellIdx % 4;
    return idx;
}

function initBlock() {
    block = new Block();
}