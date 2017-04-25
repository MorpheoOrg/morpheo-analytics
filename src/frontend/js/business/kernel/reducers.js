import {actionTypes} from './actions';

export default function (localStorage) {
    const initialState = {
        kernel_id: localStorage.getItem('kernel_id'),
        exp: localStorage.getItem('exp') ? parseInt(localStorage.getItem('exp'), 10) : localStorage.getItem('exp'),
        authenticated: !!localStorage.getItem('kernel_id') && localStorage.getItem('exp') && parseInt(localStorage.getItem('exp'), 10) > Math.floor(Date.now() / 1000),
        loading: false,
        modal: false,
        registered: false,
    };

    return (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.connect.REQUEST:
            return {
                ...state,
                authenticated: false,
                kernel_id: null,
                exp: null,
                error: false,
                loading: true,
            };

        case actionTypes.connect.SUCCESS:
            return {
                ...state,
                ...payload,
                authenticated: true,
                error: false,
                loading: false,
            };

        case actionTypes.connect.FAILURE:
            return {
                ...state,
                authenticated: false,
                error: payload,
                loading: false,
                kernel_id: null,
                exp: null,
            };

        case actionTypes.disconnect.SUCCESS:
            return {
                ...state,
                authenticated: false,
                kernel_id: null,
                loading: false,
                exp: null,
            };

        default:
            return state;
        }
    };
}
