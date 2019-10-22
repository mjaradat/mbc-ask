const common = require('./webpack.common.js');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        host: '0.0.0.0',
        port: '8082',
        disableHostCheck: true,
        proxy: {
            "/data/games/": {
                "target": "https://mbc3.mbc.net",
                "changeOrigin": true,
                "secure": false
            }
        }
    }
});
