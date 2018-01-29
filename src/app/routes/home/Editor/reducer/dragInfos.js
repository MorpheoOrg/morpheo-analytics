import {actionsTypes} from '../actions';


const initialState = {active: false};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.tab.dragStart:
        return {
            data: {
                start: payload,
            },
            active: true,
        };

    case actionsTypes.tab.dragOver:
        return {
            ...state,
            data: {
                ...state.data,
                over: payload,
            },
        };

    case actionsTypes.tab.dragOut:
        return {
            ...state,
            data: {
                start: state.data.start,
            },
        };

    case actionsTypes.tab.dragEnd:
        return initialState;

    default:
        return state;
    }
};