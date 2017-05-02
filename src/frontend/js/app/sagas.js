import {fork} from 'redux-saga/effects';
// import kernelSagas from '../business/kernel/sagas';
import userSagas from '../business/user/sagas';

/* istanbul ignore next */
export default function* () {
    // yield fork(kernelSagas);
    yield fork(userSagas);
}
