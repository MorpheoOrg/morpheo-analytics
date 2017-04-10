import {routerActions} from 'react-router-redux';
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
            yield put(signInActions.failure(error));
        }
        else {
            const {user, token} = res;

            const {exp, username, user_id, email} = JSON.parse(atob(token.split('.')[1]));
            user.token = token;
            user.exp = exp;
            user.username = username;

            yield call(storeLocalUser, {user, token, email});
            yield put(signInActions.success(user));

            if (user) {
                yield put(routerActions.push({
                    ...previousRoute,
                    // make sure we don't push history on same location
                    pathname: previousRoute.pathname === '/' ? '/experiments' : previousRoute.pathname,
                }));
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
        yield put(routerActions.push({
            pathname: '/',
            // store current location if relogin
            state: {
                ...state.routing.locationBeforeTransitions,
            },
        }));
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
