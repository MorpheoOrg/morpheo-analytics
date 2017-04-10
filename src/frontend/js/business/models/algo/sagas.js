/* globals API_URL */

import {call, put, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import uuidV4 from 'uuid/v4';
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
    loadAdditionnal,
} from '../sagas';

function* loadAlgos(request) {
    const {error, list} = yield call(loadAdditionnal(fetchAlgosApi), request);

    if (error) {
        yield put(actions.item.get.failure(error.body));
    }
    else if (list) {
        yield put(actions.item.get.success({id: request.payload, list}));
    }
}


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

        yield put(actions.item.post.success(item));
        // Post to orchestrator too
        yield put(actions.item.postToOrchestrator.request({uuid: item.uuid, problem: uuidV4()}));
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


/* istanbul ignore next */
const algoSagas = function* algoSagas() {
    yield [
        /** ***********/
        /* algo */
        /** ***********/
        takeLatest(actionTypes.item.get.REQUEST, loadAlgos),
        takeLatest(actionTypes.item.create.REQUEST, createAlgo),
        takeLatest(actionTypes.item.delete.REQUEST, deleteAlgo),

        takeLatest(actionTypes.item.post.REQUEST, postAlgo),
        takeLatest(actionTypes.item.postToOrchestrator.REQUEST, postToOrchestrator),
    ];
};


export default algoSagas;
