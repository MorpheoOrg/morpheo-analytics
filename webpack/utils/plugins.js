import webpack from 'webpack';
import config from 'config';
import path from 'path';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';
import HappyPack from 'happypack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';

import definePlugin from './definePlugin';
import dll from './dll';


const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV));
const PRODUCTION = (['production'].includes(process.env.NODE_ENV));
const DEBUG = !(
    ['production', 'development', 'staging'].includes(process.env.NODE_ENV)
);
const PRODUCTION_BASE_NAME = config.apps.frontend.baseName.production;

export default env => [
    ...(env === 'frontend' ? [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
            filename: '[name].js',
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
            new BrowserSyncPlugin(
                // BrowserSync options
                {
                    // browse to http://localhost:3001/ during development
                    open: false,
                    port: config.apps.frontend.api_port + 1,
                    proxy: {
                        target: `localhost:${config.apps.frontend.api_port}`,
                    },
                    ghostMode: false,
                },
                // plugin options
                {
                    // prevent BrowserSync require(reloading the page
                    // and let Webpack Dev Server take care of this
                    reload: false,
                    callback: () => console.log('Finished proxifying...'),
                },
            ),
        ]),
    ] : [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
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
                    'transform-runtime',
                    'lodash',
                    ...(PRODUCTION ? [
                        'transform-class-properties',
                        'transform-es2015-classes',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements',
                        'transform-react-remove-prop-types',
                    ] : []),
                    ...(DEVELOPMENT ? ['react-hot-loader/babel'] : []),
                ],
                presets: [
                    'es2015',
                    'react',
                    'stage-0',
                    ['env', {
                        modules: false,
                        useBuiltIns: true,
                        targets: {
                            browsers: [
                                '> 1%',
                                'last 2 versions',
                                'Firefox ESR',
                            ],
                        },
                    }],
                ],
            },
        }],
        threads: 4,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractCssChunks({
        filename: '[name].css',
        allChunks: false,
    }),
    ...(DEBUG ? [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
    })] : []),
    ...(PRODUCTION ? [new SWPrecacheWebpackPlugin(
        {
            cacheId: config.appName,
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            minify: true,
            dynamicUrlToDependencies: {
                '/': [
                    path.resolve(__dirname, '../../src/client/js/index.js'),
                ],
            },
            navigateFallback: PRODUCTION_BASE_NAME,
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        },
    )] : []),
];