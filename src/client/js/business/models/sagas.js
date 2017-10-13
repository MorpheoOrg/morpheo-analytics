import {fork} from 'redux-saga/effects';

import challengeSagas from './challenge/sagas';
import experimentSagas from './experiment/sagas';

const rootSaga = function* rootSaga() {
    yield fork(challengeSagas);
    yield fork(experimentSagas);
};

export default rootSaga;
