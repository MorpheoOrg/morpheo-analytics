import {createAction} from 'redux-actions';
import createRequestActionTypes from '../../actions/createRequestActionTypes';

export const actionTypes = {
    signIn: createRequestActionTypes('SIGN_IN'),
    signUp: createRequestActionTypes('SIGN_UP'),
    signOut: createRequestActionTypes('SIGN_OUT'),
    modal: {
        SET: 'USER_MODAL_SET',
    },
    verify: createRequestActionTypes('VERIFY'),
};

export const signIn = {
    request: createAction(actionTypes.signIn.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        ...credentials,
    })),
    success: createAction(actionTypes.signIn.SUCCESS),
    failure: createAction(actionTypes.signIn.FAILURE),
};

export const signUp = {
    request: createAction(actionTypes.signUp.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        ...credentials,
    })),
    success: createAction(actionTypes.signUp.SUCCESS),
    failure: createAction(actionTypes.signUp.FAILURE),
};

export const signOut = {
    request: createAction(actionTypes.signOut.REQUEST),
    success: createAction(actionTypes.signOut.SUCCESS),
    failure: createAction(actionTypes.signOut.FAILURE),
};


export const modal = {
    set: createAction(actionTypes.modal.SET),
};

export const verify = {
    request: createAction(actionTypes.verify.REQUEST),
    success: createAction(actionTypes.verify.SUCCESS),
    failure: createAction(actionTypes.verify.FAILURE),
};

export default {
    signIn,
    signOut,
    signUp,
    modal,
    verify,
};
