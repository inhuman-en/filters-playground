const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path');
let development = process.env.NODE_ENV !== 'production';

let manifest = new ManifestPlugin({
    fileName: 'build-manifest.json'
});

let clean = new CleanWebpackPlugin(['public/*.*'], {
    verbose: false
});

module.exports = {
    mode: development ? 'development' : 'production',
    context: path.join(__dirname),
    devtool: development ? 'inline-sourcemap' : false,
    entry: './client/src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'scripts.[chunkhash].min.js'
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'entry'
                            }
                        ],
                        [
                            '@babel/preset-react',
                            {
                                development
                            }
                        ]
                    ],
                    plugins: [
                        'react-html-attrs',
                        '@babel/proposal-class-properties'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]'
                    }
                ]
            }
        ]
    },
    plugins: [clean, manifest, new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[chunkhash].css",
        chunkFilename: "styles.[chunkhash].css"
      })]
};
