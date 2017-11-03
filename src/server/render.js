/* global APP_NAME META_DESCRIPTION META_KEYWORDS */

import React from 'react';
import ReactDOM from 'react-dom/server';
import {extractCritical} from 'emotion-server';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import configureStore from './configureStore';

import App from '../common/routes';
import serviceWorker from './serviceWorker';
import DevTools from '../common/DevTools';

import Dll from '../../webpack/utils/dll';


// include DevTools on server for react 16 hydrate method
const Wrapper = process.env.NODE_ENV !== 'production'
    ? ({children}) => <div>{children}<DevTools/></div>
    : ({children}) => React.Children.only(children);

const createApp = (App, store) =>
    (<Provider store={store}>
        <Wrapper>
            <App/>
        </Wrapper>
    </Provider>);


// TODO: handle [hash]
const flushDll = (clientStats) => Object.keys(Dll._originalSettings.entry).map(o =>
    `<script type="text/javascript" src="${clientStats.publicPath}${Dll._originalSettings.filename.replace(/\[name\]/, o)}" defer></script>`,
).join('\n');

export default ({clientStats}) => async (req, res, next) => {

    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createApp(App, store);
    const {html, ids, css} = extractCritical(ReactDOM.renderToString(app));

    // Grab the CSS from our sheetsRegistry.
    const stateJson = JSON.stringify(store.getState());
    const chunkNames = flushChunkNames();
    const {js, styles, cssHash} = flushChunks(clientStats, {chunkNames});
    const dll = flushDll(clientStats);

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
          <meta name="description" content="${META_DESCRIPTION}"/>
          <meta name="keywords" content="${META_KEYWORDS}" />
          ${styles}
          <style type="text/css">${css}</style>
          <link rel="preload" href="/font/ShadedLarch_PERSONAL_USE.ttf" as="font" crossorigin>
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <script>${`window.EMOTION_IDS = new Array("${ids}")`}</script>
          <div id="root">${html}</div>
          ${cssHash}
          ${dll}
          ${js}
          ${serviceWorker}
        </body>
      </html>`,
    );
};
