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

class ARUtils {
    constructor($params) {
        this.product = ($params && $params.product) ? $params.product : false;
    }
    isLocal() {
        return (window.location.href.indexOf("C://") > -1 || window.location.href.indexOf("file://") > -1 || window.location.href.indexOf("localhost") > -1);
    }

    getDomain() {
        return (this.isLocal() ? "localhost" : document.location.href.match(/http[s]*:\/\/([a-zA-Z0-9\-\.]*)/)[1]);
    }

    getUrlVars() {
        const vars = {};
        const hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        hashes.forEach(hash => vars[hash.split("=")[0]] = hash.split("=")[1]);
        return vars;
    }
    getUrlVar($name) {
        return this.getUrlVars()[$name];
    }

    log($o) {
        if (this.product) return;
        if (window.console && window.console.log.apply) { console.log($o); } else if (window.console) { console.log($o); }
    }

    warn($o) {
        if (this.product) return;
        if (window.console && window.console.warn.apply) { console.warn($o); } else if (window.console) { console.warn($o); }
    }

    getIEVersion() {
        if (navigator.appVersion.indexOf("MSIE") > -1) {
            const _tri = "Trident/";
            const _idx = navigator.appVersion.indexOf("Trident/");
            let _tridentVer;
            let _exploerVer;

            if (_idx > -1) { _tridentVer = navigator.appVersion.charAt(_idx + _tri.length); }

            switch (Number(_tridentVer)) {
            case 4: _exploerVer = 8; break;
            case 5: _exploerVer = 9; break;
            case 6: _exploerVer = 10; break;
            case 7: _exploerVer = 11; break;
            default: _exploerVer = 7; break;
            }
            return _exploerVer;
        }
        return 999;
    }

    isIELow() {
        return (this.getIEVersion() < 9);
    }

    isDevice() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }

    isIOS() {
        return (/iPhone|iPad|iPod/i.test(navigator.userAgent));
    }

    isAndroid() {
        return (/Android/i.test(navigator.userAgent));
    }

    isInApp() {
        return false;
    }

    setCookie($name, $value, $exdays) {
        const exdate = new Date();
        exdate.setDate(exdate.getDate() + $exdays);
        const cValue = escape($value) + (($exdays == null) ? "" : `; expires=${exdate.toUTCString()}`);
        document.cookie = `${$name}=${cValue}`;
    }

    getCookie($name) {
        let _value = null;
        document.cookie.split(";").forEach((cookie) => {
            if (cookie.substr(0, cookie.indexOf("=")).replace(/^\s+|\s+$/g, "") == $name) { _value = unescape(cookie.substr(cookie.indexOf("=") + 1)); }
        });
        return _value;
    }

    isValidUserName($name) {
        return /^[가-힣]{2,8}$/.test($name);
    }

    isValidUserPhone($number) {
        return /^01([016789])([1-9]{1})([0-9]{2,3})([0-9]{4})$/.test($number);
    }
}
