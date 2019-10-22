const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals({
        modulesFromFile: true,
    })],
    entry: {
        js: './src/server.js'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'server-es5.js',
        libraryTarget: 'commonjs2',
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
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]_[local]", //"[name]_[local]_[hash:base64]",
                            sourceMap: true,
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'components': path.resolve(__dirname, '../src/components'),
            // 'common': path.resolve(__dirname, '../src/common'),
            // 'actions': path.resolve(__dirname, '../src/redux/actions'),
            // 'containers': path.resolve(__dirname, '../src/containers'),
            'routes': path.resolve(__dirname, '../src/routes'),
        }
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     { from: 'src/assets', to: 'assets' }
        // ]),
    ],
    devtool: '#source-map',
};

