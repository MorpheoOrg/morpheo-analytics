/* globals atob */

import {routerActions} from 'react-router-redux';
import {call, put, select, takeLatest} from 'redux-saga/effects';

import {
    signIn as signInActions,
    signOut as signOutActions,
    actionTypes,
} from './actions';
import {
    fetchSignIn as fetchSignInApi,
    removeLocalUser as removeLocalUserApi,
    storeLocalUser as storeLocalUserApi,
} from './api';

export const signIn = (fetchSignIn, storeLocalUser) =>
    function* signInSaga({payload: {email, password, previousRoute}}) {
        const {error, res} = yield call(fetchSignIn, email, password);

        if (error) {
            yield put(signInActions.failure(error));
        }
        else {
            const {user, token} = res;

            const {username} = JSON.parse(atob(token.split('.')[1]));
            // const {exp, username, user_id, email} = JSON.parse(atob(token.split('.')[1]));
            user.token = token;
            // user.exp = exp;
            user.username = username;

            yield call(storeLocalUser, {user, token, email});
            yield put(signInActions.success(user));

            if (user) {
                yield put(routerActions.push({
                    ...previousRoute,
                    // make sure we don't push history on same location
                    pathname: previousRoute.pathname === '/' || previousRoute.pathname === '/sign-in' ? '/' : previousRoute.pathname,
                }));
            }
            else {
                yield put(signInActions.failure({detail: `You don't have the permission to access this site. Your current permission is ${user.permission} and only admin and team policies are allowed. Please ask toan administrator for modifying your permission on morpheo service.`}));
            }
        }
    };

export const signOut = removeLocalUser =>
    function* signOutSaga() {
        const state = yield select();
        yield call(removeLocalUser);
        yield put(signOutActions.success());
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
