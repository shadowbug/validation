
const type = {};

type.checkbox = {
    // checkbox 인지 확인
    is : function(element) {
        if(element.tagName.toLowerCase() != "input") {
            return false;
        }
        if(element.type && element.type.toLowerCase() != "checkbox") {
            return false;
        }
        return true;
    },
    // 체크여부 확인
    checked : function(element) {
        return element.checked;
    }
};

type.radio = {
    is : function(element) {
        if(element.tagName.toLowerCase() != "input") {
            return false;
        }
        if(element.type && element.type.toLowerCase() != "radio") {
            return false;
        }
        return true;
    },
    // 라디오 선택 여부 확인
    selected : function(element) {
        return element.checked;
    }
};

module.exports = type;