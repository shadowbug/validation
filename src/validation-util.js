

const util = { };

// 텍스트가 비어있는지 확인한다.
util.isEmpty = function(value) {
    if(value == null) {
        return true;
    }
    if(value == "") {
        return true;
    }
    return false;
};

// 텍스트의 길이가 min값 이상인지 확인한다.ㄴ
util.isMinText = function(value, min) {
    if(util.isEmpty(value)) {
        return false;
    }
    return value.length >= min;
};


// 텍스트의 길이가 max값 아래인지 확인한다.
util.isMaxText = function(value, max) {
    if(util.isEmpty(value)) {
        return false;
    }
    return value.length < max
};

// 숫자인지 체크한다.
util.isNumber = function(value) {
    if(util.isEmpty(value)) {
        return false;
    }
    const pattern = /^[+-]?\d*(\.?\d*)$/;
    return pattern.test(value);
}

// 최소값을 체크한다.
util.isMinNumber = function(value, min) {
    if(!util.isNumber(value)) {
        return false;
    }
    var number = parseFloat(value);
    return number >= min;
}

// 최대값을 체크한다.
util.isMaxNumber = function(value, max) {
    if(!util.isNumber(value)) {
        return false;
    }

    var number = parseFloat(value);
    return number < max;
}

// 이메일을 체크한다.
util.isEmail = function(value) {
    if(util.isEmpty(value)) {
        return false;
    }
    const pattern =/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test(value);
}

// URL 양식을 체크한다.
util.isURL = function(value) {
    if(util.isEmpty(value)) {
        return false;
    }
    const pattern = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return pattern.test(value);
}

// 바이트 계산기
function byteLengthOf(s){
    //assuming the String is UCS-2(aka UTF-16) encoded
    var n=0;
    for(var i=0,l=s.length; i<l; i++){
        var hi=s.charCodeAt(i);
        if(hi<0x0080){ //[0x0000, 0x007F]
            n+=1;
        }else if(hi<0x0800){ //[0x0080, 0x07FF]
            n+=2;
        }else if(hi<0xD800){ //[0x0800, 0xD7FF]
            n+=3;
        }else if(hi<0xDC00){ //[0xD800, 0xDBFF]
            var lo=s.charCodeAt(++i);
            if(i<l&&lo>=0xDC00&&lo<=0xDFFF){ //followed by [0xDC00, 0xDFFF]
                n+=4;
            }else{
                throw new Error("UCS-2 String malformed");
            }
        }else if(hi<0xE000){ //[0xDC00, 0xDFFF]
            throw new Error("UCS-2 String malformed");
        }else{ //[0xE000, 0xFFFF]
            n+=3;
        }
    }
    return n;
}


// 최소 바이트 길이를 구한다. UTF-8 기준
util.isMinByte = function(value, min) {
    return byteLengthOf(value) >= min;
}

// 최대 바이트 길이를 구한다. UTF-8 기준
util.isMaxByte = function(value, max) {
    return byteLengthOf(value) < max;
}


module.exports = util;