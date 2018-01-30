import {fork} from 'redux-saga/effects';

import loginSagas from './components/Login/sagas';


export default function* () {
    yield fork(loginSagas);
}
