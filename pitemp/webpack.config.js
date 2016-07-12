// var path = require('path');
// var webpack = require('webpack');

module.exports = {
    context: `${__dirname}/frontend/src`,
    output: {
        path: `${__dirname}/core/static`,
        filename: 'bundle.js'
    },
    entry: './index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
