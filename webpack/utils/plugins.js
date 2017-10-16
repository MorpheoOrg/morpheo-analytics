import webpack from 'webpack';
import config from 'config';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import HappyPack from 'happypack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

import definePlugin from './definePlugin';
import dll from './dll';


const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV)),
    PRODUCTION = (['production'].includes(process.env.NODE_ENV));

export default env => [
    ...(env === 'frontend' ? [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
            filename: '[name].js',
            minChunks: Infinity,
        }),
        dll,
        ...(PRODUCTION ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false,
                },
                mangle: {
                    screw_ie8: true,
                },
                output: {
                    screw_ie8: true,
                    comments: false,
                },
                sourceMap: true,
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
            new StatsPlugin('stats.json'),
        ] : [
            new WriteFilePlugin(), // used so you can see what chunks are produced in dev
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),

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
                plugins: [
                    'universal-import',
                    'emotion',
                    'transform-runtime',
                    'lodash',
                    'date-fns',
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
                    'es2015',
                    'react',
                    'stage-0',
                ],
            },
        }],
        threads: 4,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.ProvidePlugin({
    //     fetch: 'consts-loader?this=>global!exports-loader?global.fetch!isomorphic-fetch',
    // }),
    new ExtractCssChunks({
        filename: '[name].css',
        allChunks: false,
    }),
];
