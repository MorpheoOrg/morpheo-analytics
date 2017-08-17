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

import {put, select} from 'redux-saga/effects';
import {isDate} from 'date-fns';
import queryString from 'query-string';
import {redirect} from 'redux-first-router';

//import userSagas from '../business/user/sagas';

export const setFilter = filter =>
    function* setFilterSaga(request) {
        const state = yield select(),
            location = state.location,
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
            yield put(redirect({type: location.type, payload: query}));
        }
    };

export const setDateFilter = (reducer, filter) =>
    function* setDateFilterSaga(request) {
        const state = yield select(),
            location = state.location,
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
            yield put(redirect({type: location.type, payload: query}));
        }
    };

/* istanbul ignore next */
export default function* () {
    //yield fork(userSagas);
}
