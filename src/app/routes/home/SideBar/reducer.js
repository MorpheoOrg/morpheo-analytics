import {actionTypes} from './actions';


const initialState = {
    selectedIndex: -1,
    status: 'closed',
    width: 400,
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
