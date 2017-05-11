import {call, put, takeLatest} from 'redux-saga/effects';

import actions, {
    actionTypes,
} from './actions';
import {
    save as saveApi,
} from './api';


function* save({payload}) {
    const {error, item} = yield call(saveApi, payload);

    if (error) {
        yield put(actions.save.failure(error.body));
    }
    else {
        yield put(actions.save.success(item));
    }

    return item;
}

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.save.REQUEST, save),
    ];
};


export default sagas;
