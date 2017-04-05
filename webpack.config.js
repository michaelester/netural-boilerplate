var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './app/scripts/main.ts'
    },
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configuration: require('./tslint.json')
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts']
    }
}


