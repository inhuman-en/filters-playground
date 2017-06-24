let path = require('path');
let debug = process.env.NODE_ENV !== "production";
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let ManifestPlugin = require("webpack-manifest-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//ExtractTextPlugin is meant for production usage
//thus, emitted css DONT go in the output when build is run by WDS
//let extractCSS = new ExtractTextPlugin('/styles-vendor.css');
let manifest = new ManifestPlugin({
    fileName: 'build-manifest.json'
});
let extractSASS = new ExtractTextPlugin({
    filename: "styles.[chunkhash].css"
});
let commons = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash].min.js',
    minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
    }
});
let clean = new CleanWebpackPlugin("public/*.*", {
    verbose: false
});

let define = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
});
let uglify = new webpack
    .optimize
    .UglifyJsPlugin({})

module.exports = {
    context: path.join(__dirname),
    devtool: debug
        ? "inline-sourcemap"
        : null,
    entry: "./client/src/js/main.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: "/",
        filename: "scripts.[chunkhash].min.js"
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
        ? [commons, clean, manifest, extractSASS]
        : [commons, clean, manifest, extractSASS, define, uglify],
    devServer: {
        host: "localhost",
        port: 9000,
        contentBase: __dirname + "/build"
    }
};