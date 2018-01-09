import {fork} from 'redux-saga/effects';

import algoSagas from './algo/sagas';
import learnupletSagas from './learnuplet/sagas';
import problemSagas from './problem/sagas';
import storageProblemSagas from './storage_problem/sagas';


const rootSaga = function* rootSaga() {
    yield fork(algoSagas);
    yield fork(learnupletSagas);
    yield fork(problemSagas);
    yield fork(storageProblemSagas);
};

export default rootSaga;
