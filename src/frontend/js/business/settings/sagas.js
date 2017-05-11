import {call, takeLatest} from 'redux-saga/effects';

import {
    actionTypes,
} from './actions';
import {
    storeSettings as storeSettingsApi,
} from './api';


const storeSettings = settings =>
    function* storeSettingsSaga({payload}) {
        yield call(storeSettingsApi, settings, payload);
    };

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.preferredLanguage.SET, storeSettings('preferred_language')),
        takeLatest(actionTypes.theme.SET, storeSettings('theme')),
    ];
};


export default sagas;
