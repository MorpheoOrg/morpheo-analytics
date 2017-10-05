import React from 'react';
import ReactDOM from 'react-dom/server';
import {JssProvider, SheetsRegistry} from 'react-jss';
import {create} from 'jss';
import preset from 'jss-preset-default';
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
    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createApp(App, store);
    const appString = ReactDOM.renderToString(app);
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString();
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
          <title>Analytics</title>
          ${styles}
          <link rel="stylesheet prefetch" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${process.env.NODE_ENV === 'production' ? appString : `<div>${appString}</div>`}</div>
          ${cssHash}
          <style id="jss-server-side">${css}</style>
          <script type='text/javascript' src='/reactVendors.js'></script>
          <script type='text/javascript' src='/reduxVendors.js'></script>
          <script type='text/javascript' src='/vendors.js'></script>
          ${js}
        </body>
      </html>`,
    );
};
