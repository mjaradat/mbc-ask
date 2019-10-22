const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
    entry: [
        '@babel/polyfill',
        './src/index.js',
    ],
    output: {
        filename: "bundle-v1.js",
        path: path.resolve(__dirname, "..", "dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|otf)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                      },
                    },
                  ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            // 'common': path.resolve(__dirname, '../src/common'),
            'actions': path.resolve(__dirname, '../src/redux/actions'),
            // 'containers': path.resolve(__dirname, '../src/containers'),
            'routes': path.resolve(__dirname, '../src/routes'),
            'assets': path.resolve(__dirname, '../src/assets/'),
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: './index.html',
            hash: false
        }),
    ]
};
