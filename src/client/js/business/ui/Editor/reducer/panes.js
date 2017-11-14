import {actionsTypes} from '../actions';
import paneReducer from './pane';


const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.addGroup: {
        const {paneIndex = state.length} = payload;
        return [
            ...state.slice(0, paneIndex),
            paneReducer(undefined, {type, payload}),
            ...state.slice(paneIndex),
        ];
    }

    case actionsTypes.addTab:
    case actionsTypes.selectTab:
    case actionsTypes.closeTab:
        return state.map(pane => paneReducer(pane, {type, payload}));

    default:
        return state;
    }
};
