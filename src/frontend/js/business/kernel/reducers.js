import {actionTypes} from './actions';

export default function (localStorage) {
    const initialState = {
        kernel_id: localStorage.getItem('kernel_id'),
        loading: false,
        modal: false,
        registered: false, // TODO use it
    };

    return (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.connect.REQUEST:
            return {
                ...state,
                kernel_id: null,
                error: false,
                loading: true,
            };

        case actionTypes.connect.SUCCESS:
            return {
                ...state,
                ...payload,
                error: false,
                loading: false,
            };

        case actionTypes.connect.FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
                kernel_id: null,
            };
        // TODO create
        // case actionTypes.disconnect.SUCCESS:
        //     return {
        //         ...state,
        //         kernel_id: null,
        //         loading: false,
        //     };

        default:
            return state;
        }
    };
}
