/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

import {connectRoutes} from 'redux-first-router';
import {applyMiddleware, compose} from 'redux';
import {pick} from 'lodash';

import {createInjectSagasStore, sagaMiddleware, reloadSaga} from 'redux-sagas-injector';
import {combineReducersRecurse} from 'redux-reducers-injector';

import options from '../options';
import rootSaga from '../sagas';
import rootReducer from '../reducer';
import DevTools from '../DevTools';
import routesMap from '../routesMap';


const configureStore = (history, initialState) => {

    const {
        reducer, middleware, enhancer, thunk, initialDispatch
    } = connectRoutes(history, routesMap, {
        initialDispatch: false,
        ...options,
    }); // yes, 5 redux aspects

    const enhancers = [
        // create the saga middleware
        applyMiddleware(sagaMiddleware, middleware),
        DevTools.instrument(),
    ];

    const reducers = {...rootReducer, location: reducer};
    // create an hmr initialState, when refreshing page, we do not want the injected reducers
    const hmrInitialState = pick(initialState, Object.keys(reducers));
    const store = createInjectSagasStore(
        {rootSaga}, reducers, hmrInitialState, compose(enhancer, ...enhancers)
    );
    initialDispatch();

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('../reducer', () => {
            const rootReducer = require('../reducer').default;
            const replacedReducers = {
                ...store.injectedReducers,
                ...rootReducer,
                location: reducer
            };
            store.replaceReducer(combineReducersRecurse(replacedReducers));
        });

        module.hot.accept('../sagas', () => {
            reloadSaga('rootSaga', require('../sagas').default);
        });
    }

    return {store, thunk};
};

export default configureStore;
