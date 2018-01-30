import webpack from 'webpack';
import config from 'config';
import path from 'path';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import HappyPack from 'happypack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';

import definePlugin from './definePlugin';
import dll from './dll';

import routes from '../../src/app/routesMap';


const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV)),
    PRODUCTION = (['production'].includes(process.env.NODE_ENV)),
    DEBUG = !(['production', 'development', 'staging'].includes(process.env.NODE_ENV)),
    PRODUCTION_BASE_NAME = config.apps.frontend.baseName.production;

export default env => [
    ...(env === 'frontend' ? [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
            filename: '[name].js',
            minChunks: Infinity,
        }),
        dll,
        ...(PRODUCTION ? [
            new BabelMinifyPlugin({}, {
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
                // ignore babelrc
                babelrc: false,
                plugins: [
                    ['universal-import', {disableWarnings: true}],
                    'transform-runtime',
                    'emotion',
                    'lodash',
                    ...(PRODUCTION && env === 'frontend' ? [
                        'transform-class-properties',
                        'transform-es2015-classes',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements',
                        'transform-react-remove-prop-types',
                    ] : []),
                    ...(DEVELOPMENT ? ['react-hot-loader/babel'] : []),
                ],
                presets: [
                    'env',
                    'react',
                    'stage-0',
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
            filename: 'service-worker.js',
            minify: false,
            dynamicUrlToDependencies: Object.keys(routes).reduce((p, c) => [...p, routes[c].path], []).reduce((p, c) =>
                ({
                    ...p,
                    [c]: [
                        path.resolve(__dirname, '../../src/client/index.js'),
                        path.resolve(__dirname, `../../src/app/routes${c === '/' ? '/home/' : c}components/index.js`),
                    ],
                }), {}),
            navigateFallback: PRODUCTION_BASE_NAME,
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        },
    )] : []),
];
