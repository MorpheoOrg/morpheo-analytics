/**
 * Created by guillaume on 7/1/16.
 */


import webpack from 'webpack';
import path from 'path';
import {definePlugin} from './plugins';
const PRODUCTION = (['production'].includes(process.env.NODE_ENV));

export default {
    entry: {
        React: [
            'react',
            'react-addons-create-fragment',
            'react-addons-test-utils',
            'react-addons-transition-group',
            'react-addons-shallow-compare',
            'react-dom',
            'react-helmet',
            'react-redux',
            'react-router',
            'react-router-redux',
            'react-select',
            'react-tap-event-plugin',
            'antd',
        ],
        Redux: [
            'redux',
            'redux-actions',
            'redux-saga',
            'redux-injector',
            'redux-sagas-injector',
        ],
        App: [
            'fastclick',
            'history',
            'isomorphic-fetch',
            'query-string',
            'reselect',
            'url',
            'date-fns',
        ]
    },
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, '../build/dll' + (!PRODUCTION ? '-dev' : '')),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },

    plugins: [
        definePlugin(),
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, '../build/dll' + (!PRODUCTION ? '-dev' : ''), '[name]-manifest.json'),
        }),
        new webpack.optimize.DedupePlugin(),
        ...(PRODUCTION ? [new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true,
            },
        })] : [])
    ]
};
