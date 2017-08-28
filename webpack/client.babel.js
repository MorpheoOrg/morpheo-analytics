import config from 'config';

import rules from './utils/rules';
import resolve from './utils/resolve';
import plugins from './utils/plugins';

const path = require('path');

const DEBUG = !(['production', 'development', 'staging'].includes(process.env.NODE_ENV)),
    DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV)),
    PRODUCTION = (['production'].includes(process.env.NODE_ENV)),
    PRODUCTION_BASE_NAME = config.apps.frontend.baseName.production,
    DEBUG_BASE_NAME = config.apps.frontend.baseName.debug;

module.exports = {
    name: 'client',
    target: 'web',
    entry: [
        'babel-polyfill',
        'fetch-everywhere',
        ...(DEVELOPMENT ? [
            'webpack-hot-middleware/client',
            'react-hot-loader/patch',
        ]: []),
        path.resolve(__dirname, '../src/client/js/index.js'),
        (PRODUCTION ? `${__dirname}/../src/client/css/main/prod.scss` : `${__dirname}/../src/client/css/main/dev.scss`),
    ],
    module: {
        rules: rules(),
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
        filename: `[name]${PRODUCTION ? '-[hash:6]' : ''}.js`,
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build/client'),
        publicPath: DEBUG ? DEBUG_BASE_NAME : PRODUCTION_BASE_NAME,
    },
    // devtool: 'source-map',
    //devtool: 'eval',
    devtool: DEBUG ? 'source-map' : (DEVELOPMENT ? 'cheap-module-source-map' : '#hidden-source-map'),
    plugins: plugins('frontend'),
    resolve: {
        extensions: ['.js', '.css'],
    },
    ...(DEVELOPMENT ? {
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
    }: {}),
};
