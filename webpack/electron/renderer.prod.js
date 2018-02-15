/**
 * Build config for electron renderer process
 */

import path from 'path';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HappyPack from 'happypack';

import baseConfig from './base';
import rules from '../utils/rules';
import definePlugin from '../utils/definePlugin';

import dll from '../utils/dll';


export default merge.smart(baseConfig, {
    devtool: 'source-map',
    target: 'electron-renderer',
    entry: './src/client/js/index',
    output: {
        path: path.join(__dirname, '../../src/electron/dist'),
        publicPath: './dist/',
        filename: 'renderer.prod.js',
    },
    module: {
        rules: rules('electron'),
    },
    plugins: [
        definePlugin(),
        new HappyPack({
            id: 'babel',
            loaders: [{
                path: 'babel-loader', // Options to configure babel with
                query: {
                    babelrc: false,
                    plugins: [
                        ['universal-import', {
                            disableWarnings: true,
                        }],
                        'emotion',
                        'transform-runtime',
                        'lodash',
                        'date-fns',
                        'transform-class-properties',
                        'transform-es2015-classes',
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
        dll,
        new MinifyPlugin({}, {
            comments: false,
            sourceMap: true,
        }),
        new ExtractTextPlugin('style.css'),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
            openAnalyzer: process.env.OPEN_ANALYZER === 'true',
        }),
    ],
});
