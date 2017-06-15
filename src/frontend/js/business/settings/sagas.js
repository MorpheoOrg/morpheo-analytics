/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

import {call, select, takeLatest} from 'redux-saga/effects';

import {
    actionTypes,
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
            // yield put(actions.update(res));
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
