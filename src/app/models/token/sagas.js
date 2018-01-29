import {all, call, takeLatest} from 'redux-saga/effects';

import {actionTypes} from './actions';
import {getToken} from './api';


function* tokenSaga() {
    const token = yield call(getToken);
    console.log(token);
}


export default function* () {
    yield all([
        takeLatest(actionTypes.get.REQUEST, tokenSaga),
    ]);
}
