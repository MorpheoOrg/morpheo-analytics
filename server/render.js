import React from 'react';
import ReactDOM from 'react-dom/server';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import configureStore from './configureStore';
import {MuiThemeProvider} from 'material-ui/styles';

import theme from '../src/common/theme/index';
import App from '../src/common/routes';

const createApp = (App, store) =>
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>;


export default ({clientStats}) => async (req, res, next) => {
    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createApp(App, store);
    const appString = ReactDOM.renderToString(app);
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
          <title>redux-first-router-demo</title>
          ${styles}
          <link rel="stylesheet prefetch" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${process.env.NODE_ENV === 'production' ? appString : `<div>${appString}</div>`}</div>
          ${cssHash}
          <script type='text/javascript' src='/reactVendors.js'></script>
          <script type='text/javascript' src='/reduxVendors.js'></script>
          <script type='text/javascript' src='/vendors.js'></script>
          ${js}
        </body>
      </html>`,
    );
}
