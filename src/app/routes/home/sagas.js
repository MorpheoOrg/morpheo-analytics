import {fork} from 'redux-saga/effects';

import loginSagas from './Login/sagas';


export default function* () {
    yield fork(loginSagas);
}
