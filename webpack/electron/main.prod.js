/**
 * Webpack config for production electron main process
 */

import HappyPack from 'happypack';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import baseConfig from './base';

import definePlugin from '../utils/definePlugin';
import rules from '../utils/rules';

export default merge.smart(baseConfig, {
    devtool: 'source-map',
    target: 'electron-main',
    entry: './src/electron/main.dev',
    // 'main.js' in root
    output: {
        path: __dirname,
        filename: '../../src/electron/main.prod.js',
    },
    module: {
        rules: rules('electron'),
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: [{
                path: 'babel-loader', // Options to configure babel with
                query: {
                    plugins: [
                        'universal-import',
                        'emotion',
                        'transform-runtime',
                        'lodash',
                        'date-fns',
                        'transform-class-properties',
                        'transform-es2015-classes',
                        'react-hot-loader/babel',
                    ],
                    presets: [
                        'es2015',
                        'react',
                        'stage-0',
                    ],
                },
            }],
            threads: 4,
        }),
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
