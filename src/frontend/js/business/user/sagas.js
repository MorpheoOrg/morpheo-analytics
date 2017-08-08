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
import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
    signIn as signInActions,
    signUp as signUpActions,
    signOut as signOutActions,
    verify as verifyActions,
    actionTypes,
} from './actions';
import {
    fetchSignIn as fetchSignInApi,
    fetchSignUp as fetchSignUpApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
    verify as verifyApi,
} from './api';

export const signIn = (fetchSignIn, storeLocalUser) =>
    function* signInSaga({payload: {email, password, previousRoute}}) {
        const {error, res} = yield call(fetchSignIn, email, password);

        if (error) {
            console.error(error);
            yield put(signInActions.failure(error));
        }
        else {
            const {user, token} = res;

            const {exp, username, email} = JSON.parse(atob(token.split('.')[1]));
            user.token = token;
            user.exp = exp;
            user.username = username;

            yield call(storeLocalUser, {user, token, email});
            yield put(signInActions.success(user));

            if (user) {
                yield put(redirect(previousRoute));
            }
            else {
                yield put(signInActions.failure({detail: `You don't have the permission to access this site. Your current permission is ${user.permission} and only admin and team policies are allowed. Please ask Guillaume for modifying your permission on bender service.`}));
            }
        }
    };

export const signUp = (fetchSignUp, storeLocalUser) =>
    function* signUpSaga({payload: {email, username, password1, password2, previousRoute}}) {
        const {error, res} = yield call(fetchSignUp, email, password1, password2, username);

        if (error) {
            yield put(signUpActions.failure(error));
        }
        else {
            const {detail} = res;
            yield put(signUpActions.success(detail));
        }
    };

export const signOut = removeLocalUser =>
    function* signOutSaga() {
        const state = yield select();
        yield call(removeLocalUser);
        yield put(signOutActions.success());
        yield put(redirect({type: 'HOME'}));
    };

function* verify(request) {
    const {res} = yield call(verifyApi, request.payload);

    if (res && res.detail && res.detail === 'ok') {
        yield put(routerActions.push({
            pathname: '/',
        }));
    }
    else {
        yield put(verifyActions.verify.failure(res.detail));
    }
}

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.signIn.REQUEST, signIn(fetchSignInApi, storeLocalUserApi)),
        takeLatest(actionTypes.signUp.REQUEST, signUp(fetchSignUpApi, storeLocalUserApi)),
        takeLatest(actionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
        takeLatest(actionTypes.verify.REQUEST, verify),
    ];
};

export default sagas;
