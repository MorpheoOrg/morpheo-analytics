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
                props: {},
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

    case actionsTypes.tab.updateProps: {
        const {tabId, props} = payload;
        return {
            ...state,
            [tabId]: {
                // It's not possible to remove contentId, contentType, title
                ...state[tabId],
                props: {
                    ...state[tabId].props,
                    ...props,
                }
            },
        };
    }

    default:
        return state;
    }
};
