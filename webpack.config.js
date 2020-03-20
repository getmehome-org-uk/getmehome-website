var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/index.jsx',
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
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react']
                }

            }
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
}