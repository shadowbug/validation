

const v = {};

v.util = module.require("./validation-util.js");
v.plugin = module.require("./validation-plugin.js");

v.validate = function(options) {

    for(const selector in options) {
        if(selector == "callback") {
            continue;
        }
        const option = options[selector];
        const elements = document.querySelectorAll(selector);

        for(const name in option) {
            if(name == "callback") {
                continue;
            }
            const stack = new Array();
            const value = option[name];

            const result = validate(stack, v.plugin, elements, name, value);
            
            if(!result.result) {
                const callback = option.callback || options.callback || function(type, element, message) {
                    return;
                }
                if(result.element && result.element.focus) {
                    result.element.focus();
                }
                callback(result.type, result.element, result.message);
                return false;
            }
        }
    }
    return true;
}

function validate(stack, plugins, elements, name, options) {
    try {
        stack.push(name);

        // 상위 플러그인 처리 
        const plugin = plugins[name];        
        const callback = plugin.callback || function(elements, options) { return { result: true }; };

        const result = callback(elements, options);
        if(!result.result) {
            result.type = stack.join(",");
            return result;
        }

        // 하위 플러그인 처리
        if(typeof options == "object") {
            const stype = options.type;
            for(const sname in options) {
                if(sname == "callback") {
                    continue;
                }
                const svalue = options[sname];

                const result = validate(stack, plugin, elements, sname, svalue);
                if(!result.result) {
                    return result;
                }
            }
        }
    
        return {
            result : true,
            message : "성공적으로 검증되었습니다"
        }
    } finally {
        stack.pop();
    }
}

window.v = v;

module.exports = {};