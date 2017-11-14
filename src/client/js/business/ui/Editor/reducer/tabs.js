import {actionsTypes} from '../actions';


const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.addGroup:
    case actionsTypes.addTab: {
        const {
            tabId, contentId, contentType, title,
        } = payload;
        return {
            ...state,
            [tabId]: {
                contentId,
                contentType,
                title,
            },
        };
    }

    case actionsTypes.closeTab: {
        const {tabId} = payload;
        return Object.keys(state)
            .filter(id => id !== tabId)
            .reduce((tabs, id) => ({
                ...tabs,
                [id]: state[id],
            }), {});
    }

    default:
        return state;
    }
};
