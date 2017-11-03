import path from 'path';
import webpack from 'webpack';
import AutoDllPlugin from 'autodll-webpack-plugin';

const DEVELOPMENT = (['development', 'staging'].includes(process.env.NODE_ENV));

export default new AutoDllPlugin({
    context: path.join(__dirname, '../..'),
    filename: '[name]-dll.js',
    plugins: !DEVELOPMENT ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        })
    ] : [],
    debug: true,
    entry: {
        reactVendors: [
            'react',
            'react-dom',
            'react-emotion',
            'react-redux',
            'react-tap-event-plugin',
        ],
        reduxVendors: [
            'redux',
            'redux-actions',
            'redux-first-router',
            'redux-first-router-link',
            'redux-reducers-injector',
            'redux-saga',
            'redux-sagas-injector'
        ],
        commonVendors: [
            'emotion',
            'fastclick',
            'google-map-react',
            'history',
            'react-helmet',
            'recompose',
            'transition-group',
        ],
    },
});
