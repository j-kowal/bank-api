const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => ({
    entry: {
        main: ['babel-polyfill', './src/app.js']
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'js/app.js'
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    args.mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    'resolve-url-loader',
                    "sass-loader?sourceMap"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
})