/* global APP_NAME */

import React from 'react';
import ReactDOM from 'react-dom/server';
import {JssProvider, SheetsRegistry} from 'react-jss';
import {create} from 'jss';
import preset from 'jss-preset-default';
import {extractCritical} from 'emotion-server';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import {MuiThemeProvider} from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import configureStore from './configureStore';

import theme from '../common/theme/index';
import App from '../common/routes';

// Create a sheetsRegistry instance.
const sheetsRegistry = new SheetsRegistry();

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

const createApp = (App, store) =>
    (<Provider store={store}>
        <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </JssProvider>
    </Provider>);


export default ({clientStats}) => async (req, res, next) => {
    // Add btoa and atob on the server
    global.Buffer = global.Buffer || require('buffer').Buffer;

    if (typeof btoa === 'undefined') {
        global.btoa = str => new Buffer(str).toString('base64');
    }

    if (typeof atob === 'undefined') {
        global.atob = b64Encoded => new Buffer(
            b64Encoded, 'base64',
        ).toString();
    }

    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createApp(App, store);
    const {html, ids, css} = extractCritical(ReactDOM.renderToString(app));
    // Grab the CSS from our sheetsRegistry.
    const materialUiCss = sheetsRegistry.toString();
    const stateJson = JSON.stringify(store.getState());
    const chunkNames = flushChunkNames();
    const {js, styles, cssHash} = flushChunks(clientStats, {chunkNames});

    console.log('REQUESTED PATH:', req.path);
    console.log('CHUNK NAMES', chunkNames);

    return res.send(
        `<!doctype html>
      <html>
        <head>
           <meta charset="utf-8">
          <title>${APP_NAME}</title>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500,400italic,300italic,500italic' rel='stylesheet' type='text/css'>
          <link href="https://fonts.googleapis.com/css?family=Lekton:700|Oxygen+Mono|Inconsolata|Titillium+Web" rel="stylesheet">
          ${styles}
          <style type="text/css">${css}</style>
          <style id="jss-server-side">${materialUiCss}</style>
          <link rel="stylesheet prefetch" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <script>${`window.__EMOTION_IDS__ = new Array("${ids}")`}</script>
          <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
          ${cssHash}
          <script type='text/javascript' src='/reactVendors.js'></script>
          <script type='text/javascript' src='/reduxVendors.js'></script>
          <script type='text/javascript' src='/vendors.js'></script>
          ${js}
        </body>
      </html>`,
    );
};
