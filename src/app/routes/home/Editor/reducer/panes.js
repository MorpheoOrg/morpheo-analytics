import {actionsTypes} from '../actions';

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @global
 * @typedef {Object} PaneState -
 *     Pane state.
 * @property {string} paneID -
 *     Pane Identifier.
 * @property {Array<string>} activeTabOrder -
 *     Order of the last tab activated.
 * @property {Array<sting>} tabs -
 *     List of the tabs indentifiers contained in the pane. The order is the
 *     displayed order.
 */

// Define basic pane operation
const pane = {
    /**
     * Initialize a new pane from the paneId.
     *
     * @param {string} paneId - Id of the new pane.
     * @returns {object} - the new pane.
     */
    new: paneId => ({
        paneId,
        activeTabOrder: [], // activation order
        tabs: [], // visibility order
    }),
};


/**
 * Define basic tab operation
 */
const tab = {
    add: (pane, {tabId, tabIndex = pane.tabs.length}) => ({
        ...pane,
        activeTabOrder: [
            tabId,
            ...pane.activeTabOrder,
        ],
        tabs: [
            ...pane.tabs.slice(0, tabIndex),
            tabId,
            ...pane.tabs.slice(tabIndex),
        ],
    }),

    setActive: (pane, {tabId}) => ({
        ...pane,
        activeTabOrder: [
            tabId,
            ...pane.activeTabOrder.filter(id => id !== tabId),
        ],
    }),

    move: (pane, {tabId, tabIndex}) => ({
        ...pane,
        tabs: [
            ...pane.tabs.slice(0, tabIndex),
            tabId,
            ...pane.tabs.slice(tabIndex),
        ],
        activeTabOrder: [
            tabId,
            ...pane.activeTabOrder.filter(id => id !== tabId),
        ],
    }),

    remove: (pane, {tabId}) => ({
        ...pane,
        tabs: pane.tabs.filter(id => id !== tabId),
        activeTabOrder: pane.activeTabOrder.filter(id => id !== tabId),
    }),
};

const initialState = [];

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.tab.add: {
        const {paneId} = payload;
        return state.map(({paneId}) => paneId).includes(paneId) ?
            // if paneId exists we add the tab paneId
            state.map(pane => (pane.paneId === paneId) ?
                tab.add(pane, payload) : pane) :
            // else we create paneId before adding the tab
            [...state, tab.add(pane.new(paneId), payload)];
    }

    case actionsTypes.tab.setActive: {
        const {paneId} = payload;
        return state.map(pane => (pane.paneId === paneId) ?
            tab.setActive(pane, payload) : pane);
    }

    case actionsTypes.tab.remove: {
        const {paneId} = payload;
        return state.map(pane => (pane.paneId === paneId) ?
            tab.remove(pane, payload) : pane);
    }

    case actionsTypes.tab.moveIntoNewPane: {
        const {
            paneId, paneIdFrom, tabId, paneIndex = state.length,
        } = payload;
        const newState = state.map(pane => pane.paneId === paneIdFrom ?
            tab.remove(pane, {tabId}) : pane);
        return [
            ...newState.slice(0, paneIndex),
            tab.add(pane.new(paneId), {tabId}),
            ...newState.slice(paneIndex),
        ];
    }

    case actionsTypes.tab.move: {
        const {
            paneIdFrom, tabId, paneIdTo, tabIndex,
        } = payload;

        return state
            // Remove the tab from paneIdFrom
            .map(pane => pane.paneId === paneIdFrom ?
                tab.remove(pane, {tabId}) : pane)
            // Add the tab to paneIdTo at tabIndex
            .map(pane => pane.paneId === paneIdTo ?
                tab.add(pane, {tabId, tabIndex}) : pane);
    }

    default:
        return state;
    }
};
