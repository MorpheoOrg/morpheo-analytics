import {actionsTypes} from '../actions';


const initialState = {
    paneId: null,
    activeTabOrder: [], // activation order
    tabs: [], // visibility order
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.addGroup: {
        const {paneId, tabId} = payload;
        return {
            paneId,
            activeTabOrder: [tabId],
            tabs: [tabId],
        };
    }

    case actionsTypes.addTab: {
        const {paneId, tabId, tabIndex = state.tabs.length} = payload;
        return state.paneId === paneId ? {
            ...state,
            activeTabOrder: [
                tabId,
                ...state.activeTabOrder,
            ],
            tabs: [
                ...state.tabs.slice(0, tabIndex),
                tabId,
                ...state.tabs.slice(tabIndex),
            ],
        } : state;
    }

    case actionsTypes.selectTab: {
        const {paneId, tabId} = payload;
        return state.paneId === paneId ? {
            ...state,
            activeTabOrder: [
                tabId,
                ...state.activeTabOrder.filter(id => id !== tabId),
            ],
        } : state;
    }

    case actionsTypes.closeTab: {
        const {paneId, tabId} = payload;
        return state.paneId === paneId ? {
            ...state,
            tabs: state.tabs.filter(id => id !== tabId),
            activeTabOrder: state.activeTabOrder.filter(id => id !== tabId),
        } : state;
    }

    default:
        return state;
    }
};
