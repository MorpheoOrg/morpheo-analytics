import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import chalk from 'chalk';
import merge from 'webpack-merge';
import {spawn, execSync} from 'child_process';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import HappyPack from 'happypack';


import baseConfig from './base';
import rules from '../utils/rules';
import definePlugin from '../utils/definePlugin';

const port = process.env.PORT || 1212;
const publicPath = `http://localhost:${port}/dist`;
const dll = path.resolve(process.cwd(), 'dll');
const manifest = path.resolve(dll, 'renderer.json');
/**
 * Warn if the DLL is not built
 */
if (!(fs.existsSync(dll) && fs.existsSync(manifest))) {
    console.log(chalk.black.bgYellow.bold(
        'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"',
    ));
    execSync('npm run build-dll');
}

export default merge.smart(baseConfig, {
    devtool: 'inline-source-map',

    target: 'electron-renderer',

    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../../src/client/js/index.js'),
    ],

    output: {
        publicPath: `http://localhost:${port}/dist/`,
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
                        'universal-import',
                        'emotion',
                        'transform-runtime',
                        'lodash',
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
        new ExtractCssChunks({
            filename: '[name].css',
            allChunks: false,
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(manifest),
            sourceType: 'var',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ],

    node: {
        __dirname: false,
        __filename: false,
    },

    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.join(__dirname, '../../dist'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100,
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false,
        },
        setup() {
            if (process.env.START_HOT) {
                console.log('Staring Main Process...');
                spawn(
                    'npm',
                    ['run', 'start-main-dev'],
                    {shell: true, env: process.env, stdio: 'inherit'},
                )
                    .on('close', code => process.exit(code))
                    .on('error', spawnError => console.error(spawnError));
            }
        },
    },
});
