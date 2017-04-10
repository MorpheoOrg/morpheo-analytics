/* globals API_URL */

import {call, put, select, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {routerActions} from 'react-router-redux';

import {signOut as signOutActions} from '../../user/actions';
import generalActions from '../../../app/actions';

import actions, {actionTypes} from './actions';
import trialActions from '../trial/actions';
import algoActions from '../algo/actions';
import {
    fetchExperiments as fetchExperimentsApi,

    fetchExperiment as fetchExperimentApi,

    createExperiment as createExperimentApi,
    deleteExperiment as deleteExperimentApi,

    fetchUsernames as fetchUsernamesApi,
} from './api';
import {
    loadItemFactory,
    createItemFactory,
    updateItemFactory,
    deleteItemFactory,
    loadList,
} from '../sagas';
import {setFilter} from '../../../app/sagas';

function* loadItem(request) {
    const state = yield select();

    // load these in parallel for populating item
    yield [
        call(loadItemFactory(actions, fetchExperimentApi), request),
        put(trialActions.item.get.request(request.payload)),
        put(algoActions.item.get.request(request.payload)),
        put(actions.item.set(request.payload)),
    ];
}

function* createExperiment(request) {
    const item = yield call(createItemFactory(actions, createExperimentApi), request);

    if (item) {
        message.success('Experiment successfully created!');

        if (actions.modal.create) {
            yield put(actions.modal.create.set(false));
        }
    }
}

function* deleteExperiment(request) {
    const payload = yield call(deleteItemFactory(actions, deleteExperimentApi), request);

    if (payload) {
        yield put(routerActions.replace('/experiments'));
    }
}

function* loadSharedWithExperiments(request) {
    const state = yield select(),
        q = {
            shared_with: state.user.username,
        };
    const list = yield call(loadList(actions.shared_with, fetchExperimentsApi, 'list', q), request);
}

function* loadUserExperiments(request) {
    const state = yield select(),
        q = {
            owner: state.user.username,
        };
    const list = yield call(loadList(actions.user, fetchExperimentsApi, 'list', q), request);
}


export const updateItem = () =>
    function* updateItemexperimentSaga(request) {
        const item = yield call(updateItemFactory(actions, updateExperimentApi), request);

        if (item && actions.modal.update) {
            yield put(actions.modal.update.set(false));
        }
    };


function* loadUsernames(request) {
    const state = yield select(),
        query = {
            search: request.payload,
        };

    const {error, list} = yield call(fetchUsernamesApi, query, state.user.token);

    if (error) {
        if (error.body && error.body.message) {
            console.error(error.body.message);
        }
        if (error && [401, 403].includes(error.status)) {
            yield put(signOutActions.request());
        }
        else if (error && error.message) {
            yield put(generalActions.error.set(error.message));
        }
        yield put(actions.suggestions.failure(error.body));
    }
    else {
        yield put(actions.suggestions.success(list.results.map(k => k.username).filter(k => k !== state.user.username)));
    }

}

/* istanbul ignore next */
const experimentSagas = function* experimentSagas() {
    yield [
        /** ***********/
        /* experiment */
        /** ***********/

        takeLatest(actionTypes.shared_with.list.REQUEST, loadSharedWithExperiments),
        takeLatest(actionTypes.user.list.REQUEST, loadUserExperiments),

        takeLatest(actionTypes.item.get.REQUEST, loadItem),


        takeLatest(actionTypes.filters.algo.SET, setFilter('algo')),
        takeLatest(actionTypes.filters.order.SET, setFilter('order')),
        takeLatest(actionTypes.filters.desc.SET, setFilter('desc')),
        takeLatest(actionTypes.filters.limit.SET, setFilter('limit')),


        takeLatest(actionTypes.item.create.REQUEST, createExperiment),
        takeLatest(actionTypes.item.delete.REQUEST, deleteExperiment),

        takeLatest(actionTypes.suggestions.REQUEST, loadUsernames),
    ];
};


export default experimentSagas;
