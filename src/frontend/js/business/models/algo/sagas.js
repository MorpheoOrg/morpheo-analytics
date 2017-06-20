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
/* globals */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import queryString from 'query-string';
import generalActions from '../../../app/actions';

import {signOut as signOutActions} from '../../user/actions';


import actions, {actionTypes} from './actions';
import {
    fetchAlgos as fetchAlgosApi,
    createAlgo as createAlgoApi,
    deleteAlgo as deleteAlgoApi,
    postAlgo as postAlgoApi,
    postAlgoToOrchestrator as postAlgoToOrchestratorApi,
} from './api';
import {
    createItemFactory,
    deleteItemFactory,
    // loadAdditionnal,
} from '../sagas';

// function* loadAlgos(request) {
//     const {error, list} = yield call(loadAdditionnal(fetchAlgosApi), request);
//
//     if (error) {
//         yield put(actions.item.get.failure(error.body));
//     }
//     else if (list) {
//         yield put(actions.item.get.success({id: request.payload, list}));
//     }
// }


function* createAlgo(request) {
    const item = yield call(createItemFactory(actions, createAlgoApi), request);

    if (item) {
        message.success('Algo successfully created!');

        if (actions.modal.create) {
            yield put(actions.modal.create.set(false));
        }
    }
}


function* deleteAlgo(request) {
    const payload = yield call(deleteItemFactory(actions, deleteAlgoApi), request);

    if (payload) {
        message.success('Algo deleted!');
    }
}

function* postAlgo(request) {
    const {item, error} = yield call(postAlgoApi, request.payload.body);

    if (error) {
        console.error(error.message);
        if (error && [401, 403].includes(error.status)) {
            yield put(signOutActions.request());
        }

        request.payload.onError(error.message, error.body);
        yield put(actions.item.post.failure(error.body));
    }
    else {
        if (actions.modal && actions.modal.post) {
            yield put(actions.modal.post.set(false));
        }

        request.payload.onSuccess(item);

        yield put(actions.item.post.success({...item, problem: request.payload.id}));
        // Post to orchestrator too
        yield put(actions.item.postToOrchestrator.request({uuid: item.uuid, problem: request.payload.id}));
    }
}

function* postToOrchestrator(request) {
    const {item, error} = yield call(postAlgoToOrchestratorApi, request.payload);

    if (error) {
        console.error(error.message);
        if (error && [401, 403].includes(error.status)) {
            yield put(signOutActions.request());
        }

        yield put(actions.item.postToOrchestrator.failure(error.body));
    }
    else {
        if (actions.modal && actions.modal.postToOrchestrator) {
            yield put(actions.modal.postToOrchestrator.set(false));
        }

        yield put(actions.item.postToOrchestrator.success(item));
    }
}


export const loadList = (actions, fetchList) =>
    function* loadListSaga(request) {
        const state = yield select(),
            location = state.routing.location;

        // override query if needed, default to current url query
        const query = location && location.search ? queryString.parse(location.search) : {};
        const {error, list} = yield call(fetchList, {...query, problem: request.payload});

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.list.failure(error.body));
        }
        else {
            yield put(actions.list.success({results: list.algos}));
            return list;
        }
    };

/* istanbul ignore next */
const algoSagas = function* algoSagas() {
    yield [
        /** ***********/
        /* algo */
        /** ***********/

        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchAlgosApi)),

        // takeLatest(actionTypes.item.get.REQUEST, loadAlgos),
        takeLatest(actionTypes.item.create.REQUEST, createAlgo),
        takeLatest(actionTypes.item.delete.REQUEST, deleteAlgo),

        takeLatest(actionTypes.item.post.REQUEST, postAlgo),
        takeLatest(actionTypes.item.postToOrchestrator.REQUEST, postToOrchestrator),
    ];
};


export default algoSagas;
