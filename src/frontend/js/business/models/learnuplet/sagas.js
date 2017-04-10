/* globals API_URL */

import {call, put, takeLatest} from 'redux-saga/effects';

import actions, {actionTypes} from './actions';
import {
    fetchLearnupletByAlgo as fetchLearnupletByAlgoApi,
} from './api';

function* loadList(request) {
    const {error, list} = yield call(fetchLearnupletByAlgoApi, {algo: request.payload});

    if (error) {
        yield put(actions.list.failure(error.body));
    }
    else if (list) {
        yield put(actions.list.success(list));
    }
}

/* istanbul ignore next */
const learnupletSagas = function* learnupletSagas() {
    yield [
        /** ***********/
        /* learnuplet */
        /** ***********/
        takeLatest(actionTypes.list.REQUEST, loadList),
    ];
};


export default learnupletSagas;
