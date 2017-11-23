/* globals document window */
import React from 'react';
import {hydrate, render} from 'react-dom';
import FastClick from 'fastclick';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {hydrate as emotionHydrate} from 'emotion';
import {Provider} from 'react-redux';

import ReactHotLoader from './ReactHotLoader';
import Root from './app/Root';
import history from './app/history';
import configureStore from '../../common/configureStore';
import '../css/index.scss';
import DevTools from '../../common/DevTools';


/** ******************
 *  Server hydration
 ******************* */
if (window.EMOTION_IDS) {
    emotionHydrate(window.EMOTION_IDS);
}

const {store} = configureStore(history, window.REDUX_STATE);

FastClick.attach(document.body);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const root = document.getElementById('root');
const devTools = document.getElementById('devTools');


const renderApp = (RootElement) => {
    const app = (
        <ReactHotLoader warning={false} >
            <RootElement {...{store}} />
        </ReactHotLoader>
    );

    // render for electron, hydrate for SSR
    return process.env.IS_ELECTRON !== 'false' ?
        render(app, root) : hydrate(app, root);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    // load devTools
    render(
        <Provider store={store}>
            <DevTools />
        </Provider>, devTools);

    module.hot.accept('./app/Root', () => {
        const app = require('./app/Root').default;
        renderApp(app);
    });
}

renderApp(Root);
