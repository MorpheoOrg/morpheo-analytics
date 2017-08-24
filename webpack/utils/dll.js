const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin');

export default new AutoDllPlugin({
    context: path.join(__dirname, '..'),
    filename: '[name].js',
    entry: {
        'reactVendors': [
            'react',
            'react-addons-create-fragment',
            'react-addons-transition-group',
            'react-dom',
            'react-helmet',
            'react-keydown',
            'react-konami',
            'react-redux',
            'react-select',
            'react-spinners',
            'react-tap-event-plugin',
            'react-universal-component',
        ],
        'reduxVendors': [
            'redux',
            'redux-actions',
            'redux-first-router',
            'redux-first-router-link',
            'redux-form',
            'redux-injector',
            //'redux-saga',
            //'redux-sagas-injector',
        ],
        vendors: [
            'fastclick',
            'history',
            'isomorphic-fetch',
            'material-ui',
            'material-ui-icons',
            'prismjs',
            'query-string',
            'reselect',
            'slate',
            'slate-edit-code',
            'slate-prism',
            'url',
            'uuid',
        ],
    }
});
