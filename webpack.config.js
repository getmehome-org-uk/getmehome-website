const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack_rules = [];
const webpackOption = {
    entry: {
        main: ['@babel/polyfill','./src/index.jsx'],
        worker: './src/workers/airports.worker.js'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader!css-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    // output: {
    //     filename: '[name].[hash].js'
    // },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'main' ? '[name].[hash].js': '[name].js';
          }
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4000',
            gmhRegisterApi: 'https://us-central1-getmehome-web.cloudfunctions.net/register'
        })
    }
};

module.exports = webpackOption;
