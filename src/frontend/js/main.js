/* globals document */

import 'babel-core/register';
import 'babel-polyfill';

import FastClick from 'fastclick';
import React from 'react';
import {render} from 'react-dom';
import {createRenderer} from 'fela';
import {Provider as FelaProvider} from 'react-fela';
import {AsyncComponentProvider} from 'react-async-component';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactHotLoader from './ReactHotLoader';
import Root from './app/Root/index';
import configureStore from './app/configureStore/index';

const store = configureStore();

FastClick.attach(document.body);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const root = document.getElementById('root');
const renderer = createRenderer();
const mountNode = document.getElementById('stylesheet');

const renderApp = RootElement => {
    const app = <ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider>
            <FelaProvider renderer={renderer} mountNode={mountNode}>
                <RootElement {...{store}} />
            </FelaProvider>
        </AsyncComponentProvider>
    </ReactHotLoader>;

    render(app, root);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./app/Root/index', () =>
        System.import('./app/Root/index').then(module => renderApp(module.default)),
    );
}

renderApp(Root);

