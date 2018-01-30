import {select, takeLatest} from 'redux-saga/effects';
import settings from 'electron-settings';

import {actionsTypes} from './actions';
import {getLoginVariables} from './selectors';


function* saveSettingsEnv() {
    const login = yield select(getLoginVariables);
    settings.set('settings.login', login);
}

export default function* () {
    yield takeLatest(actionsTypes.env.set, saveSettingsEnv);
}
