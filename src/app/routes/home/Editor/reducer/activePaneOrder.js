import {actionsTypes} from '../actions';


const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.tab.add:
    case actionsTypes.tab.setActive:
    case actionsTypes.tab.moveIntoNewPane:
    case actionsTypes.tab.remove: {
        const {paneId} = payload;
        return [
            paneId,
            ...state.filter(id => id !== paneId),
        ];
    }

    case actionsTypes.tab.move: {
        const {paneIdTo} = payload;
        return [
            paneIdTo,
            ...state.filter(id => id !== paneIdTo),
        ];
    }

    default:
        return state;
    }
};
