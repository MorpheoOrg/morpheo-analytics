/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './base';
import {dependencies} from '../../package.json';
import rules from '../utils/rules';
import plugins from '../utils/plugins';

const dist = path.resolve(process.cwd(), 'dll');


export default merge.smart(baseConfig, {
    context: process.cwd(),
    devtool: 'eval',
    target: 'electron-renderer',
    externals: ['fsevents', 'crypto-browserify'],
    module: {
        rules: rules(),
    },
    resolve: {
        modules: [
            '../../src',
        ],
    },
    entry: {
        renderer: Object.keys(dependencies || {}).filter(o => !['babel-runtime'].includes(o)),
    },
    output: {
        library: 'renderer',
        path: dist,
        filename: '[name].dev.dll.js',
        libraryTarget: 'var',
    },
    plugins: [
        ...plugins(),
        new webpack.DllPlugin({
            path: path.join(dist, '[name].json'),
            name: '[name]',
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                context: path.resolve(process.cwd(), 'src'),
                output: {
                    path: path.resolve(process.cwd(), 'dll'),
                },
            },
        }),
    ],
});
