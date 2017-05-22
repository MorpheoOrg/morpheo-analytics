import {applyMiddleware, compose} from 'redux';
import {createInjectSagasStore, sagaMiddleware} from 'redux-sagas-injector';
import {routerMiddleware} from 'react-router-redux';

import rootSaga from '../sagas';
import rootReducer from '../reducers';

import history from '../history/prod';

export default function configureStore(initialState) {
    const enhancers = [
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history),
        )];

    return createInjectSagasStore(rootReducer, rootSaga, initialState, compose(...enhancers));
}
