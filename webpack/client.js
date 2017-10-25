import config from 'config';
import path from 'path';
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import HappyPack from 'happypack';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';

import definePlugin from './utils/definePlugin';
import dll from './utils/dll';
import resolve from './utils/resolve';


const DEBUG = !(
    ['production', 'development', 'staging'].includes(process.env.NODE_ENV)
);
const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV));
const PRODUCTION = (['production'].includes(process.env.NODE_ENV));
const PRODUCTION_BASE_NAME = config.apps.frontend.baseName.production;
const DEBUG_BASE_NAME = config.apps.frontend.baseName.debug;

module.exports = {
    name: 'client',
    target: 'web',
    entry: [
        'babel-polyfill',
        'fetch-everywhere',
        ...(DEVELOPMENT ? [
            'webpack-hot-middleware/client',
            'react-hot-loader/patch',
        ] : []),
        path.resolve(__dirname, '../src/client/js/index.js'),
    ],
    output: {
        filename: `ES6/[name]${PRODUCTION ? '-[hash:6]' : ''}.js`,
        chunkFilename: 'ES6/[name].js',
        path: path.resolve(__dirname, '../build/client'),
        publicPath: DEBUG ? DEBUG_BASE_NAME : PRODUCTION_BASE_NAME,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel',
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                use: 'url-loader?limit=10000&name=ES6/img/[hash].[ext]',
            },
            {
                test: /\.(otf|svg)(\?.+)?$/,
                use: 'url-loader?limit=8192&name=ES6/font/[name].[ext]',
            },
            {
                test: /\.eot(\?\S*)?$/,
                use: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject&name=ES6/font/[name].[ext]',
            },
            {
                test: /\.woff2(\?\S*)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff2&name=ES6/font/[name].[ext]',
            },
            {
                test: /\.woff(\?\S*)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff&name=ES6/font/[name].[ext]',
            },
            {
                test: /\.ttf(\?\S*)?$/,
                use: 'url-loader?limit=10000&mimetype=application/font-ttf&name=ES6/font/[name].[ext]',
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ExtractCssChunks.extract({
                    use: [
                        'css-loader?importLoaders&sourceMap&name=ES6/[name].[ext]',
                        'sass-loader?sourceMap&sourceComments&name=ES6/[name].[ext]',
                    ],
                }),
            },
        ],
    },
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: DEVELOPMENT,
        version: DEVELOPMENT,
        timings: true,
        chunks: DEVELOPMENT,
        chunkModules: DEVELOPMENT,
        cached: DEVELOPMENT,
        cachedAssets: DEVELOPMENT,
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
            filename: 'ES6/[name].js',
            minChunks: Infinity,
        }),
        dll,
        ...(PRODUCTION ? [
            new BabiliPlugin({}, {
                comments: false,
                sourceMap: true,
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new StatsPlugin('stats.json'),
        ] : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new WriteFilePlugin(),
        ]),
        ...(DEVELOPMENT ? [new webpack.NamedModulesPlugin()] : []),
        definePlugin(),
        new LodashModuleReplacementPlugin({
            shorthands: true,
        }),
        new HappyPack({
            id: 'babel',
            loaders: [{
                path: 'babel-loader', // Options to configure babel with
                query: {
                    babelrc: false,
                    plugins: [
                        'universal-import',
                        'emotion',
                        'lodash',
                        'transform-class-properties',
                        ...(PRODUCTION ? [
                            'transform-react-constant-elements',
                            'transform-react-inline-elements',
                            'transform-react-remove-prop-types',
                        ] : []),
                        ...(DEVELOPMENT ? ['react-hot-loader/babel'] : []),
                    ],
                    presets: [
                        'react',
                        'stage-0',
                        [
                            'env',
                            {
                                modules: false,
                                useBuiltIns: true,
                                targets: {
                                    browsers: [
                                        'Chrome >= 60',
                                        'Safari >= 10.1',
                                        'iOS >= 10.3',
                                        'Firefox >= 54',
                                        'Edge >= 15',
                                    ],
                                },
                            }
                        ],
                    ],
                },
            }],
            threads: 4,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractCssChunks({
            filename: 'ES6/[name].css',
            allChunks: false,
        }),
    ],
    resolve: resolve(),
};
