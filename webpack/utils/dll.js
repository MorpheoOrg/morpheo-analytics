import path from 'path';
import webpack from 'webpack';
import BabelMinifyPlugin from 'babel-minify-webpack-plugin';
import AutoDllPlugin from 'autodll-webpack-plugin';


const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV));

export default new AutoDllPlugin({
    inject: true,
    context: path.join(__dirname, '../..'),
    filename: '[name]-dll.js',
    plugins: !DEVELOPMENT ? [
        new BabelMinifyPlugin({}, {
            comments: false,
            sourceMap: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ] : [],
    debug: true,
    entry: {
        reactVendors: [
            'react',
            'react-dom',
            'emotion',
            'react-emotion',
            'react-helmet',
            'react-konami',
            'react-redux',
            'react-markdown',
            'react-tap-event-plugin',
        ],
        reduxVendors: [
            'redux',
            'redux-actions',
            'redux-first-router',
            'redux-first-router-link',
            'redux-form',
            'redux-reducers-injector',
            'redux-saga',
            'redux-sagas-injector',
        ],
        commonVendors: [
            'fastclick',
            'history',
            'lodash',
            'material-ui',

            'recharts',
            'recompose',
            'reselect',
            'url',
            'uuid',

            'date-fns',
            'ends-with',
            'error-stack-parser',
            'query-string',
            'react-universal-component',
            'sw-precache-webpack-plugin',
        ],
    },
});
