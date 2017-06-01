/* globals atob */

import {routerActions} from 'react-router-redux';
import {call, put, select, takeLatest} from 'redux-saga/effects';

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
            yield put(signInActions.failure(error));
        }
        else {
            const {settings, access_token} = res;
            const {uuid} = JSON.parse(atob(access_token.split('.')[1]));

            yield call(storeLocalUser, {uuid, settings, access_token});
            yield put(signInActions.success({uuid}));
            yield put(settingsActions.update(...settings));

            yield put(routerActions.push({
                ...previousRoute,
                // make sure we don't push history on same location
                pathname: previousRoute.pathname === '/' || previousRoute.pathname === '/sign-in' ? '/' : previousRoute.pathname,
            }));
        }
    };

export const signOut = removeLocalUser =>
    function* signOutSaga() {
        const state = yield select();
        yield call(removeLocalUser);
        yield put(signOutActions.success());
        yield put(settingsActions.update({theme: null, preferred_language: null, keybindings: null}));
        yield put(routerActions.push({
            pathname: '/',
            // store current location if relogin
            state: {
                ...state.routing.location,
            },
        }));
    };

/* istanbul ignore next */
const sagas = function* sagas() {
    yield [
        takeLatest(actionTypes.signIn.REQUEST, signIn(fetchSignInApi, storeLocalUserApi)),
        takeLatest(actionTypes.signOut.REQUEST, signOut(removeLocalUserApi)),
    ];
};


export default sagas;
