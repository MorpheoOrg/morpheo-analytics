/* globals API_URL */

import {call, put, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';


import actions, {actionTypes} from './actions';
import {
    fetchTrials as fetchTrialsApi,
    deleteTrial as deleteTrialApi,

} from './api';
import {
    deleteItemFactory,
    loadAdditionnal,
} from '../sagas';

function* loadTrials(request) {
    const {error, list} = yield call(loadAdditionnal(fetchTrialsApi), request);

    if (error) {
        yield put(actions.item.get.failure(error.body));
    }
    else if (list) {
        yield put(actions.item.get.success({id: request.payload, list}));
    }
}

function* deleteTrial(request) {
    const payload = yield call(deleteItemFactory(actions, deleteTrialApi), request);

    if (payload) {
        message.success('Trial deleted!');
    }
}


/* istanbul ignore next */
const trialSagas = function* trialSagas() {
    yield [
        /** ***********/
        /* trial */
        /** ***********/
        takeLatest(actionTypes.item.get.REQUEST, loadTrials),
        takeLatest(actionTypes.item.delete.REQUEST, deleteTrial),
    ];
};


export default trialSagas;
