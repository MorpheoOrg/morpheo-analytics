import {fork} from 'redux-saga/effects';
import kernelSagas from '../business/kernel/sagas';


/* istanbul ignore next */
export default function* () {
    yield fork(kernelSagas);
}
