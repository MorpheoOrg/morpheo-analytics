import {actionTypes} from '../actions/sideBar';

const initialState = {
    visible: true,
    width: 200,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.toogleVisibility:
        return {
            ...state,
            visible: !state.visible,
        };

    case actionTypes.hide:
        return {
            ...state,
            visible: false,
        };

    case actionTypes.resize:
        return {
            ...state,
            width: payload.width,
        };

    default:
        return state;
    }
};
