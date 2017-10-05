import {actionTypes} from '../actions/sideBar';

const initialState = {
    selectedIndex: -1,
    visible: true,
    width: 400,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.toogleIndex: {
        const {selectedIndex} = payload;
        return {
            ...state,
            selectedIndex: state.selectedIndex === selectedIndex ?
                -1 : selectedIndex,
        };
    }
    case actionTypes.toogleVisibility:
        return {
            ...state,
            visible: !state.visible,
        };

    case actionTypes.hide:
        return {
            ...state,
            selectedIndex: -1,
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
