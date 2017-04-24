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
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import ReactHotLoader from './ReactHotLoader';
import App from './components/App';
import reducer from './reducers';
import {addCell, connectKernel} from './actions';


const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inpsb3RlbiJ9.6kZ-0Y96-gAzrOXzqH91F9WAgAAFXpRaayVifYjuEv4';
const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

store.dispatch(addCell());
store.dispatch(connectKernel('127.0.0.1', '8080', jwt));

FastClick.attach(document.body);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const root = document.getElementById('root');
const renderer = createRenderer();
const mountNode = document.getElementById('stylesheet');

const renderApp = (RootElement) => {
    const app = (<ReactHotLoader key={Math.random()}>
        <AsyncComponentProvider>
            <FelaProvider renderer={renderer} mountNode={mountNode}>
                {/* Put that into Root*/}
                <Provider store={store}>
                    <RootElement />
                </Provider>
            </FelaProvider>
        </AsyncComponentProvider>
    </ReactHotLoader>);

    render(app, root);
};

renderApp(App);
