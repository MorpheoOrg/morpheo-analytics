import {fork, put, select} from 'redux-saga/effects';
import {isDate} from 'date-fns';
import queryString from 'query-string';
import {routerActions} from 'react-router-redux';

import userSagas from '../business/user/sagas';

export const setFilter = filter =>
    function* setFilterSaga(request) {
        const state = yield select(),
            location = state.routing.location,
            query = location && location.search ? queryString.parse(location.search) : {};

        if (typeof request.payload !== 'undefined' && request.payload !== null) { // is not null ? (0 can be passed)
            query[filter] = Array.isArray(request.payload) ? request.payload.reduce((previous, current) => {
                previous.push(`${current}`);
                return previous;
            }, []) :
                (request.payload.value ? `${request.payload.value}` : `${request.payload}`);
        }
        else {
            delete query[filter]; // remove from url
        }

        const search = queryString.stringify(query);
        if (search !== location.search.slice(1)) { // note that `location.search` automatically prepends a question mark
            yield put(routerActions.replace({...location, search}));
        }
    };

export const setDateFilter = (reducer, filter) =>
    function* setDateFilterSaga(request) {
        const state = yield select(),
            location = state.routing.location,
            query = location && location.search ? queryString.parse(location.search) : {};

        if (request.payload) { // is null ?
            if (isDate(request.payload)) { // if date object store it, else already stored in query (timestamp)
                query[filter] = `${Math.floor(request.payload.getTime() / 1000)}`; // important to cast to string for avoiding rerendering
            }
        }
        else {
            delete query[filter]; // remove from url
        }

        const search = queryString.stringify(query);
        if (search !== location.search.slice(1)) { // note that `location.search` automatically prepends a question mark
            yield put(routerActions.replace({...location, search}));
        }
    };

/* istanbul ignore next */
export default function* () {
    yield fork(userSagas);
}
