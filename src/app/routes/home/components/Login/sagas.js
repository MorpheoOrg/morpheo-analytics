// TODO: move that in models

import {select, takeLatest} from 'redux-saga/effects';
import settings from 'electron-settings';

import {actionsTypes} from './actions';
import {getCredentials} from './selectors';


function* saveSettingsEnv() {
    const login = yield select(getCredentials);
    settings.set('settings.login', {
        ...login,
        version: '0.0.2',
    });
}

export default function* () {
    yield takeLatest(actionsTypes.env.set, saveSettingsEnv);
}
