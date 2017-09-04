/**
 * Webpack config for production electron main process
 */

import path from 'path';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import baseConfig from './base';

import definePlugin from '../utils/definePlugin';

export default merge.smart(baseConfig, {
    devtool: 'source-map',
    target: 'electron-main',
    entry: path.join(__dirname, '../../src/electron/main.dev.js'),
    // 'main.js' in root
    output: {
        path: __dirname,
        filename: '../../src/electron/main.prod.js',
    },

    plugins: [
        new BabiliPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true',
        }),
        definePlugin(),
    ],

    /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
    node: {
        __dirname: false,
        __filename: false,
    },
});
