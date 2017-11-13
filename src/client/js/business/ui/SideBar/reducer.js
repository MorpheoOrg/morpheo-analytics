import {actionTypes} from './actions';


const initialState = {
    selectedIndex: 0,
    status: 'opened',
    width: 400,
    duration: 150,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.setIndex: {
        return {
            ...state,
            selectedIndex: payload,
        };
    }
    case actionTypes.setStatus:
        return {
            ...state,
            status: payload,
            selectedIndex: payload === 'closed' ? -1 : state.selectedIndex,
        };

    case actionTypes.resize:
        return {
            ...state,
            width: payload,
        };

    default:
        return state;
    }
};
