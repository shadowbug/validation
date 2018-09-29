

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
            const value = option[name];
            const result = validate(elements, name, value);
            if(!result.result) {
                const callback = option.callback || options.callback || function(type, element, message) {
                    return;
                }
                callback(result.type, result.element, result.message);
                return false;
            }
        }
    }
    return true;
}

function validate(elements, name, value) {
    if(v.plugin[name] == null) {
        throw "Plugin " + name + "은 존재하지 않습니다";
    }

    const plugin = v.plugin[name];
    if(plugin.callback == null) {
        throw "Plugin " + name + "은 콜백이 정의되지 않았습니다";
    }


    if(plugin.dependency != null) {
        for(const defName in plugin.dependency) {
            const defValue = plugin.dependency[defName];

            const result = validate(elements, defName, defValue);
            if(!result.result) {
                return result;
            }
        }
    }

    const result = plugin.callback(elements, value);
    if(!result.result) {
        result.type = name;
        result.message = plugin.error || "Plugin " + name + "으로부터 검증을 실패하였습니다";
        return result;
    }

    return {
        result : true,
        message : "성공적으로 검증되었습니다"
    }
}

window.v = v;

module.exports = {};