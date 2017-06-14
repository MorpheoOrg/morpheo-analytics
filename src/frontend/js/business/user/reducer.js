import {actionTypes} from './actions';

export default function (localStorage) {
    const initialState = {
        uuid: localStorage.getItem('uuid'),
        access_token: localStorage.getItem('access_token'),
        // exp: localStorage.getItem('exp') ? parseInt(localStorage.getItem('exp'), 10) : localStorage.getItem('exp'),
        authenticated: !!localStorage.getItem('access_token'),
        loading: false,
        modal: false,
        registered: false,
    };

    return (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.signIn.REQUEST:
            return {
                ...state,
                authenticated: false,
                access_token: null,
                // exp: null,
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
                uuid: '',
                authenticated: false,
                error: payload,
                loading: false,
                token: null,
                // exp: null,
                registered: false,
            };

        case actionTypes.signOut.SUCCESS:
            return {
                ...state,
                uuid: '',
                authenticated: false,
                has_permission: false,
                token: null,
                loading: false,
                // exp: null,
            };
        case actionTypes.modal.SET:
            return {
                ...state,
                modal: payload,
            };
        default:
            return state;
        }
    };
}
