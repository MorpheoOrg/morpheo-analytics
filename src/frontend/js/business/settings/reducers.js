import {actionTypes} from './actions';

export default function (localStorage) {
    const initialState = JSON.parse(localStorage.getItem('settings'));

    return (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.theme.SET:
            return {
                ...state,
                theme: parseInt(payload, 10),
            };
        case actionTypes.preferred_language.SET:
            return {
                ...state,
                preferred_language: parseInt(payload, 10),
            };
        case actionTypes.keybindings.SET:
            return {
                ...state,
                keybindings: payload,
            };
        case actionTypes.line_numbers.SET:
            return {
                ...state,
                line_numbers: payload,
            };
        case actionTypes.UPDATE:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
        }
    };
}
