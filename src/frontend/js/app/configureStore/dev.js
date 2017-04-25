// import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, compose} from 'redux';
// import {createInjectStore} from 'redux-injector';
import {createInjectSagasStore, sagaMiddleware} from 'redux-sagas-injector';

import rootReducer from '../reducers';


import rootSaga from '../sagas';
import DevTools from '../DevTools';
import history from '../history/dev';

export default function configureStore(initialState) {
    // create the saga middleware
    const enhancers = [
        applyMiddleware(
            sagaMiddleware,
            // thunk,
            routerMiddleware(history),
        ),
        DevTools.instrument()];

    console.log('render this');
    // const store = createInjectStore(rootReducer, initialState, compose(...enhancers));
    const store = createInjectSagasStore(
        rootReducer, rootSaga, initialState, compose(...enhancers));

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(rootReducer),
        );
    }

    return store;
}
