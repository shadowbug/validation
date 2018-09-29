const util = module.require("./validation-util.js");
const type = module.require("./validation-type.js");

const plugin = { };

// 빈값 체크 플러그인
plugin.empty = {
    callback : function(elements, condition) {
        if(!condition) {
            for(const element of elements) {
                if(util.isEmpty(element.value)) {
                    return {
                        result : false,
                        element : element,
                        message : "비어있는 값이 발견되였습니다"
                    };
                }
            }
        }
        return {
            result : true
        };
    }
};

// 텍스트 플러그인
plugin.text = {
    // 텍스트 최소값 관리 플러그인
    min : {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMinText(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "텍스트 길이가 최소 " + value + "자 이상이어야 합니다"
                    };
                }  
            }
            return {
                result : true
            };
        }
    },
    // 텍스트 최대값 관리 플러그인
    max : {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMaxText(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "텍스트 길이가 최소 " + value + "자 이상이어야 합니다"
                    };
                }
            }
            return {
                result : true
            };
        }
    }
};

// 숫자 관리 플러그인
plugin.number = {
    callback : function(elements, options) {
        options = typeof options == "object" ? options : {} || {};
        for(const element of elements) {
            if(!util.isNumber(element.value)) {
                return {
                    result : false,
                    element : element,
                    message : "올바르지 않은 숫자값입니다"
                };
            }
        }
        return {
            result : true
        };
    },
    // 숫자 최소값 관리 플러그인
    min : {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMinNumber(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "숫자는 최소 " + value + " 이상 이어야 합니다"
                    };
                }
            }
            return {
                result : true
            };
        }
    },
    // 숫자 최대값 관리 플러그인
    max: {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMaxNumber(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "숫자는 최대 " + value + " 미만 이어야 합니다"
                    };
                }
            }
            return {
                result : true
            };
        }
    }
};



// 바이너리 관리 플러그인
plugin.byte = {

    // 바이너리 최소 길이 체크
    min : {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMinByte(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "byte[UTF-8] 길이는 최소 " + value + " 이상이 어야 합니다"
                    };
                }
            }
            return {
                result : true
            };
        }
    },
    // 바이너리 최대 길이 체크
    max : {
        callback : function(elements, value) {
            for(const element of elements) {
                if(!util.isMaxByte(element.value, value)) {
                    return {
                        result : false,
                        element : element,
                        message : "byte[UTF-8] 길이는 최대 " + value + " 미만 이어야 합니다"
                    };
                }
            }
            return {
                result : true
            };
        }
    }
};

// 이메일 플러그인
plugin.email = {
    callback : function(elements, condition) {
        if(condition) {
            for(const element of elements) {
                if(!util.isEmail(element.value)) {
                    return {
                        result : false,
                        element : element,
                        message : "이메일 양식에 위배됩니다."
                    };
                }
            }
        }
        return {
            result : true
        };
    }
};

// URL 플러그인
plugin.url = {
    callback : function(elements, condition) {
        if(condition) {
            for(const element of elements) {
                if(!util.isURL(element.value)) {
                    return {
                        result : false,
                        element : element,
                        message : "URL 양식에 위배됩니다."
                    };
                }
            }
        }
        return {
            result : true
        };
    }
};

// 체크박스 플러그인 
plugin.checkbox = {
    // 체크박스 검증 
    callback : function(elements, options) {        
        for(const element of elements) {
            if(!type.checkbox.is(element)) {
                throw "체크박스 엘리먼트가 요구됩니다.";
            }
        }
        return {
            result : true
        };
    },
    // 모든 체크 엘리먼트가 선택되었는지 확인하는 플러그인
    checkedAll : {
        callback : function(elements, condition) {
            if(condition) {
                for(const element of elements) {
                    if(!type.checkbox.checked(element)) {
                        return {
                            result : false,
                            element : element,
                            message : "체크박스가 선택되지 않았습니다"
                        };
                    }
                }
            }
            return {
                result : true
            };
        }
    },
    // 한개이상의 체크박스가 선택되었는지 확인하는 플러그인
    checkedOne : {
        callback : function(elements, condition) {
            if(condition) {
                for(const element of elements) {
                    if(type.checkbox.checked(element)) {
                        return {
                            result : true
                        };
                    }
                }
            }
            return {
                result : false,
                element : elements,
                message : "하나의 체크박스도 선택되지 않았습니다"
            };
        }
    }
};

plugin.radio = {
    callback : function(elements, options) {        
        for(const element of elements) {
            if(!type.radio.is(element)) {
                throw "라디오 엘리먼트가 요구됩니다.";
            }
        }
        return {
            result : true
        };
    },

    // 한개이상의 체크박스가 선택되었는지 확인하는 플러그인
    selected : {
        callback : function(elements, condition) {
            if(condition) {
                for(const element of elements) {
                    if(type.radio.selected(element)) {
                        return {
                            result : true
                        };
                    }
                }
            }
            return {
                result : false,
                element : elements,
                message : "라디오버튼이 선택되지 않았습니다"
            };
        }
    }
}




module.exports = plugin;