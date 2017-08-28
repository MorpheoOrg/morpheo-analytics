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

/* globals atob */

import {redirect} from 'redux-first-router';
import {call, put, takeLatest} from 'redux-saga/effects';

import {
    signIn as signInActions,
    signOut as signOutActions,
    actionTypes,
} from './actions';
import {actions as settingsActions} from '../settings/actions';

import {
    fetchSignIn as fetchSignInApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
} from './api';

export const signIn = (fetchSignIn, storeLocalUser) =>
    function* signInSaga({payload: {uuid, previousRoute}}) {
        const {error, res} = yield call(fetchSignIn, uuid);

        if (error) {
            console.error(error);
            yield put(signInActions.failure(error));
            // yield put(signInActions.failure(new Error('{"message": "Unauthorized"}')));
        }
        else {
            const {settings, access_token} = res;
            const {uuid} = JSON.parse(atob(access_token.split('.')[1]));

            yield call(storeLocalUser, {uuid, settings, access_token});
            yield put(signInActions.success({uuid}));
            yield put(settingsActions.update(...settings));

            yield put(redirect(previousRoute));
        }
    };

export const signOut = removeLocalUser =>
    function* signOutSaga() {

        yield call(removeLocalUser);
        yield put(signOutActions.success());
        // TODO should be handle in settings reducer
        yield put(settingsActions.update({theme: null, preferred_language: null, keybindings: null}));

        yield put(redirect({type: 'HOME'}));
    };

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.signIn.REQUEST, signIn(fetchSignInApi, storeLocalUserApi)),
        takeLatest(actionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
    ];
};


export default sagas;
