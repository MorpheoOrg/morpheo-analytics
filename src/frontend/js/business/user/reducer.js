import {actionTypes} from './actions';
import {actionTypes as settingsActionTypes} from '../settings/actions';

export default function (localStorage) {
    const initialState = {
        email: localStorage.getItem('email'),
        username: localStorage.getItem('username'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        token: localStorage.getItem('token'),
        exp: localStorage.getItem('exp') ? parseInt(localStorage.getItem('exp'), 10) : localStorage.getItem('exp'),
        permission: localStorage.getItem('permission'),
        authenticated: !!localStorage.getItem('token'),
        has_permission: ['admin', 'team'].includes(localStorage.getItem('permission')) || !isNaN(parseInt(localStorage.getItem('permission'), 10)),
        loading: false,
        modal: false,
        registered: false,
        theme: localStorage.getItem('theme') || '',
        preferred_language: localStorage.getItem('preferred_language') || 'python',
    };

    return (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.signIn.REQUEST:
            return {
                ...state,
                email: payload.email,
                authenticated: false,
                has_permission: false,
                token: null,
                exp: null,
                permission: null,
                error: false,
                loading: true,
            };
        case actionTypes.signIn.SUCCESS:
            return {
                ...state,
                ...payload,
                authenticated: true,
                registered: true,
                error: false,
                loading: false,
            };

        case actionTypes.signIn.FAILURE:
            return {
                ...state,
                email: '',
                authenticated: false,
                has_permission: false,
                error: payload,
                loading: false,
                token: null,
                exp: null,
                permission: null,
                registered: false,
            };

        case actionTypes.signOut.SUCCESS:
            return {
                ...state,
                email: '',
                authenticated: false,
                has_permission: false,
                token: null,
                loading: false,
                exp: null,
                permission: null,
            };
        case actionTypes.modal.SET:
            return {
                ...state,
                modal: payload,
            };
        case settingsActionTypes.theme.SET:
            return {
                ...state,
                theme: payload,
            };
        case settingsActionTypes.preferredLanguage.SET:
            return {
                ...state,
                preferred_language: payload,
            };
        default:
            return state;
        }
    };
}
