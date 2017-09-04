/**
 * Build config for electron renderer process
 */

import path from 'path';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


import baseConfig from './base';
import rules from '../utils/rules';
import definePlugin from '../utils/definePlugin';


export default merge.smart(baseConfig, {
    devtool: 'source-map',
    target: 'electron-renderer',
    entry: path.join(__dirname, '../../src/client/js/index.js'),
    output: {
        path: path.join(__dirname, '../../src/electron/dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    module: {
        rules: rules('electron'),
    },
    plugins: [
        definePlugin(),
        new BabiliPlugin(),
        new ExtractTextPlugin('style.css'),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true',
        }),
    ],
});
