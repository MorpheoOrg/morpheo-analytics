import {applyMiddleware, compose} from 'redux';
import {createInjectSagasStore, sagaMiddleware} from 'redux-sagas-injector';
import {routerMiddleware} from 'react-router-redux';

import rootSaga from '../sagas';
import rootReducer from '../reducers';
import DevTools from '../DevTools';
import history from '../history/dev';

export default function configureStore(initialState) {
    // create the saga middleware

    const enhancers = [
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history),
        ),
        DevTools.instrument()];

    const store = createInjectSagasStore(rootReducer, rootSaga, initialState, compose(...enhancers));

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(rootReducer),
        );
    }

    return store;
}
