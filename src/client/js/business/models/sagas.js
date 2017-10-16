import {fork} from 'redux-saga/effects';

import problemSagas from './problem/sagas';
import experimentSagas from './experiment/sagas';
import storageProblemSagas from './storage_problem/sagas';

const rootSaga = function* rootSaga() {
    yield fork(problemSagas);
    yield fork(experimentSagas);
    yield fork(storageProblemSagas);
};

export default rootSaga;
