import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import HappyPack from 'happypack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import config from 'config';

import rules from './rules';
import resolve from './resolve';
import {definePlugin} from './plugins';

const DEBUG = !(['production', 'development', 'staging'].includes(process.env.NODE_ENV)),
    DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV)),
    PRODUCTION = (['production'].includes(process.env.NODE_ENV)),
    PRODUCTION_BASE_NAME = config.apps.frontend.baseName.production,
    DEBUG_BASE_NAME = config.apps.frontend.baseName.debug;


const DllArray = ['React', 'Redux', 'App'];
const DllReferencePlugins = () => {
    const arr = [];
    for (let i = 0, l = DllArray.length; i < l; i++) {
        if (!fs.existsSync(`./build/dll${!PRODUCTION ? '-dev' : ''}/${DllArray[i]}-manifest.json`)) {
            console.error(`The DLL manifest is missing. Please run \`npm run dll${!PRODUCTION ? ':dev' : ''}\``);
            process.exit(0);
        }
        else {
            arr.push(new webpack.DllReferencePlugin({
                context: path.join(__dirname, '..'),
                manifest: require(`../build/dll${!PRODUCTION ? '-dev' : ''}/${DllArray[i]}-manifest.json`),
            }));
        }
    }
    return arr;
};
const AddAssetHtmlPlugins = () => {
    const arr = [];
    for (let i = 0, l = DllArray.length; i < l; i++) {
        if (!fs.existsSync(`./build/dll${!PRODUCTION ? '-dev' : ''}/${DllArray[i]}.dll.js`)) {
            console.error(`The DLL is missing. Please run \`npm run dll${!PRODUCTION ? ':dev' : ''}\``);
            process.exit(0);
        }
        else {
            arr.push({
                filepath: require.resolve(`../build/dll${!PRODUCTION ? '-dev' : ''}/${DllArray[i]}.dll.js`),
                //hash: true, // can break prod
            });
        }
    }
    return [new AddAssetHtmlPlugin(arr)];
};

export default {
    entry: {
        index: [
            `${__dirname}/../src/frontend/js/main.js`,
            (PRODUCTION ? `${__dirname}/../src/frontend/css/main/main.prod.scss` : `${__dirname}/../src/frontend/css/main/main.dev.scss`),
        ],
    },
    module: {
        rules: rules('frontend'),
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
    output: {
        filename: '[name].js',
        path: `${__dirname}/../build/frontend`,
        // https://blog.jetbrains.com/webstorm/2015/09/debugging-webpack-applications-in-webstorm/
        publicPath: DEBUG ? DEBUG_BASE_NAME : PRODUCTION_BASE_NAME,
    },
    devtool: DEBUG ? 'source-map' : (DEVELOPMENT ? 'cheap-module-source-map' : '#hidden-source-map'),
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: [{
                path: 'babel-loader',         // Options to configure babel with
                query: {
                    plugins: [
                        'lodash',
                        'date-fns',
                        ['import', {
                            libraryName: 'antd',
                            style: true,
                        }],
                        'transform-runtime',
                        ...(PRODUCTION ? [
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
        ...(DEVELOPMENT ? [new webpack.NamedModulesPlugin()] : []),
        new webpack.ProvidePlugin({
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!isomorphic-fetch',
        }),
        definePlugin(),
        ...(DllReferencePlugins()),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: `${__dirname}/../src/frontend/favicon.ico`,
            template: `${__dirname}/../src/frontend/index.html`,
            inject: 'body',
            hash: true,
            ...(PRODUCTION ? {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            } : {}),
        }),
        ...(AddAssetHtmlPlugins()),
        new LodashModuleReplacementPlugin({
            shorthands: true,
        }),
        ...(PRODUCTION ? [
            new ExtractTextPlugin({
                filename: '[name].css',
                allChunks: false,
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false,
                },
            }),
            new webpack.optimize.AggressiveMergingPlugin(),
        ] : []),
    ],
    resolve: resolve(),
    devServer: {
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,PATCH',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization',
        },
    },
    watch: true,
    cache: true,
};
