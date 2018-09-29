

const util = { };

util.isEmpty = function(value) {
    if(value == null) {
        return true;
    }
    if(value == "") {
        return true;
    }
    return false;
};

module.exports = util;