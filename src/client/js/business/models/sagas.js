import {all} from 'redux-saga/effects';

import challengeSagas from './challenge/sagas';
import experimentSagas from './experiment/sagas';

export default function* rootSaga() {
    yield all([
        challengeSagas,
        experimentSagas,
    ]);
}