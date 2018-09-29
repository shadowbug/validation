const util = module.require("./validation-util.js");

module.exports = {
    empty : {
        error : "비어있는 값이 발견되였습니다",
        callback : function(elements, condition) {
            if(condition) {
                for(const element of elements) {
                    if(util.isEmpty(element.value)) {
                        return {
                            result : false,
                            element : element
                        };
                    }
                }
            }
            return {
                result : true
            };
        }
    }
}