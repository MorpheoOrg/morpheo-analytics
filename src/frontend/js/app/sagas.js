import {fork} from 'redux-saga/effects';
import userSagas from '../business/user/sagas';

/* istanbul ignore next */
export default function* () {
    yield fork(userSagas);
}
