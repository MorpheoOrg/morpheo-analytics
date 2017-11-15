import {actionsTypes} from '../actions';


const initialState = {};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.tab.add: {
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

    case actionsTypes.tab.remove: {
        const {tabId} = payload;
        return Object.keys(state)
            .filter(id => id !== tabId)
            .reduce((tabs, id) => ({
                ...tabs,
                [id]: state[id],
            }), {});
    }

    case actionsTypes.tab.updateContent: {
        const {tabId, ...content} = payload;
        return {
            ...state,
            [tabId]: {
                ...state[tabId],
                ...content,
            },
        };
    }

    default:
        return state;
    }
};
