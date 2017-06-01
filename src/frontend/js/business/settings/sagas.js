import {call, select, put, takeLatest} from 'redux-saga/effects';

import {
    actionTypes,
    actions,
} from './actions';
import {
    storeSettings as storeSettingsApi,
    updateSettings as updateSettingsApi,
} from './api';


const storeSettings = settings =>
    function* storeSettingsSaga({payload}) {
        const state = yield select();

        const {res} = yield call(updateSettingsApi, state.settings.id, {[settings]: payload});

        if (res) {
            //yield put(actions.update(res));
            yield call(storeSettingsApi, JSON.stringify(res));
        }
    };

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.preferred_language.SET, storeSettings('preferred_language')),
        takeLatest(actionTypes.theme.SET, storeSettings('theme')),
        takeLatest(actionTypes.line_numbers.SET, storeSettings('line_numbers')),
    ];
};


export default sagas;
