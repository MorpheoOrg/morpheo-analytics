import {fork} from 'redux-saga/effects';

import algoSagas from './algo/sagas';
import problemSagas from './problem/sagas';
import experimentSagas from './experiment/sagas';
import storageProblemSagas from './storage_problem/sagas';

const rootSaga = function* rootSaga() {
    yield fork(algoSagas);
    yield fork(experimentSagas);
    yield fork(problemSagas);
    yield fork(storageProblemSagas);
};

export default rootSaga;
