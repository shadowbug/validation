

module.exports = (env, args) => {

    let config = {
        entry : {
            "validation" : "./src/validation.js"
        },
        output : {
            filename : "[name].bundle.js",
            path : __dirname + "./dist"
        }
    };

    return config;
};