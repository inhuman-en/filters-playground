let debug = process.env.NODE_ENV !== "production";
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
//ExtractTextPlugin is meant for production usage
//thus, emitted css DONT go in the output when build is run by WDS
//let extractCSS = new ExtractTextPlugin('/styles-vendor.css');
let extractSASS = new ExtractTextPlugin('/styles-build.css');

let path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug
        ? "inline-sourcemap"
        : null,
    entry: "./client/src/js/main.js",
    output: {
        path: __dirname + "/public/",
        publicPath: "/",
        filename: "scripts.min.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                'react', 'es2015', 'stage-0'
                            ],
                            plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
                        }
                    }
                ]   



            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    filename: "styles-build.css",
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }, {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "file-loader?name=[name].[ext]"
                    }
                ]

            }
        ]
    },

    plugins: debug
        ? [extractSASS]
        : [
            extractSASS,
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack
                .optimize
                .UglifyJsPlugin({})
        ],
    devServer: {
        host: "localhost",
        port: 9000,
        contentBase: __dirname + "/build"
    }
};