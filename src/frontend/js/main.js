/* globals document */

import 'babel-core/register';
import 'babel-polyfill';

import FastClick from 'fastclick';
import React from 'react';
import {render} from 'react-dom';
import {createRenderer} from 'fela';
import {Provider} from 'react-fela';
import {AsyncComponentProvider} from 'react-async-component';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {AppContainer} from 'react-hot-loader';
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
const app = <AsyncComponentProvider>
    <Provider renderer={renderer} mountNode={mountNode}>
        <Root {...{store}} />
    </Provider>
</AsyncComponentProvider>;

const renderHotApp = (RootElement) => {
    render(<AppContainer key={Math.random()}>
        <AsyncComponentProvider>
            <Provider renderer={renderer} mountNode={mountNode}>
                <RootElement {...{store}} />
            </Provider>
        </AsyncComponentProvider>
    </AppContainer>, root);
};


if (process.env.NODE_ENV !== 'production') {
    // whyDidYouUpdate(React, {include: /^Create/});
    // whyDidYouUpdate(React, {exclude: /^AsyncComponent|ListItem|^LogMonitor|^DockMonitor|^FilterMonitor|^JSONNestedNode|^JSONTree|^Overlay|^TouchRipple|^EnhancedButton|^IconButton|^Toolbar|^SvgIcon|^ContentAdd|^Flat|^AutoLock|^Card|^Paper|^ContentClear|^ContentCreate|syncWarnings$|^RaisedButton/});
    if (module.hot) {
        module.hot.accept('./app/Root/index', () =>
            System.import('./app/Root/index').then(module =>
                renderHotApp(module.default),
            ),
        );
    }
    renderHotApp(Root);
}
else {
    render(app, root);
}
