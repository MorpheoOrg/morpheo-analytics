import {createAction} from 'redux-actions';
import createRequestActionTypes from '../../actions/createRequestActionTypes';

export const actionTypes = {
    signIn: createRequestActionTypes('SIGN_IN'),
    signOut: createRequestActionTypes('SIGN_OUT'),
    modal: {
        SET: 'USER_MODAL_SET',
    },
    theme: {
        SET: 'USER_THEME_SET',
    },
    preferred_language: {
        SET: 'USER_PREFERRED_LANGUAGE_SET',
    },
};

export const signIn = {
    request: createAction(actionTypes.signIn.REQUEST, (previousRoute, credentials) => ({
        previousRoute,
        ...credentials,
    })),
    success: createAction(actionTypes.signIn.SUCCESS),
    failure: createAction(actionTypes.signIn.FAILURE),
};

export const signOut = {
    request: createAction(actionTypes.signOut.REQUEST),
    success: createAction(actionTypes.signOut.SUCCESS),
    failure: createAction(actionTypes.signOut.FAILURE),
};


export const modal = {
    set: createAction(actionTypes.modal.SET),
};


export const settings = {
    setTheme: createAction(actionTypes.theme.SET),
    setPreferred_language: createAction(actionTypes.preferred_language.SET),
};

export default {
    signIn,
    signOut,
    modal,
    settings,
};
