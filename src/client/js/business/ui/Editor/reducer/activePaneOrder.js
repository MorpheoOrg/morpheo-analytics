import {actionsTypes} from '../actions';


const initialState = [];

export default (state = initialState, {type, payload}, isPaneEmpty = false) => {
    switch (type) {
    case actionsTypes.addGroup: {
        const {paneId} = payload;
        return [
            paneId,
            ...state,
        ];
    }

    case actionsTypes.addTab:
    case actionsTypes.selectTab: {
        const {paneId} = payload;
        return [
            paneId,
            ...state.filter(id => id !== paneId),
        ];
    }

    case actionsTypes.closeTab: {
        const {paneId} = payload;
        return isPaneEmpty ? state.filter(id => id !== paneId) : [
            paneId,
            ...state.filter(id => id !== paneId),
        ];
    }

    default:
        return state;
    }
};
