const path = module.require("path");
const webpack = module.require("webpack");

module.exports = (env, args) => {

    let config = {
        entry : {
            "validation" : "./src/validation.js"
        },
        output : {
            filename : "[name].bundle.js",
            path : __dirname + "/dist"
        },
        plugins : [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer : {
            port : 9000,
            contentBase : __dirname,
            inline: true,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.join(__dirname),
                    exclude: /(node_modules)|(dist)/,
                    use: {
                        loader: 'babel-loader',
                        options : {
                            presets: ['env']
                        }
                    }
                }
            ]
        }    
    };

    return config;
};