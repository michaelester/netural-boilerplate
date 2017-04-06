import path from 'path';
import webpack from 'webpack';

const plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          unused: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
        },
        output: {
          comments: false,
        }
    })
];

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
    },
    plugins
}


