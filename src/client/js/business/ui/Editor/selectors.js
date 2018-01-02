import createDeepEqualSelector from '../../../utils/selector';

/**
 * Get the pane array from the redux state.
 * @param {ReduxState} state - Redux state..
 * @return {Array<PaneState>} - Array of panes states.
 */
export const getPanes = state => state.settings.editor.panes;

/**
 * Get the panes length.
 * @param {ReduxState} state - Redux state.
 * @return {number} - Panes length
 */
export const getPanesLength = state => state.settings.editor.panes.length;

/**
 * Get the tab dictionnary from the redux state.
 * @param {ReduxState} state - Redux state.
 * @return {Array<TabState>} - Dictionnary of tabs.
 */
export const getTabs = state => state.settings.editor.tabs;

/**
 * Get the drag informations during drag'n drop.
 * @param {ReduxState} state - Redux state.
 */
export const getDragInfos = state => state.settings.editor.dragInfos;

/**
 * Get the list of panes sort by last activation.
 * @param {ReduxState} state - Redux state.
 */
export const getActivePaneList = state => state.settings.editor.activePaneOrder;

// TODO: cleant the following functions
export const dragActive = state => getDragInfos(state).active;
export const getDragData = state => getDragInfos(state).data;
export const getDragStartData = state => getDragData(state) ?
    getDragData(state).start : undefined;
export const getDragOverData = state => getDragData(state) ?
    getDragData(state).over : undefined;

export const getPaneIdList = createDeepEqualSelector(
    [getPanes],
    panes => panes.map(({paneId}) => paneId),
);

/**
 * Compute the x-translation of a tab during a drag phase.
 *
 * @param {object} start -
 *     Drag start data.
 * @param {object} over -
 *     Drag over data.
 * @param {string} paneId -
 *     Pane indentifier.
 * @param {number} tabIndex -
 *     Tab index.
 */
const getXTranslation = (start, over, paneId, tabIndex) => {
    // If drag'n drop doesn't start, we do not move the tab
    if (!start) return 0;

    // If drag'n drop starts
    else if (!over || over.paneId !== paneId) {
        // And nothing is overred we remove the empty space of the dragged tab
        // in the start pane
        if (paneId === start.paneId) {
            return start.tabIndex <= tabIndex ? -start.width : 0;
        }
        // For other pane we do not move the tab
        return 0;
    }

    // If the pane overred is not the start pane we move all the tab after the
    // overred tab
    else if (start.paneId !== over.paneId) {
        return over.tabIndex <= tabIndex ? start.width : 0;
    }

    // If the overred pane is the started pane, we remove the space of the
    // dragged tab as follow:
    // tabIndex < over.tabIndex < start.tabIndex : 0
    // over.tabIndex < tabIndex < start.tabIndex : + width
    // over.tabIndex < start.tabIndex : 0

    // tabIndex < start.tabIndex < over.tabIndex : 0
    // start.tabIndex < tabIndex < over.tabIndex : -width
    // start.tabIndex < over.tabIndex < tabIndex : 0
    // special case: over.tabIndex === undefined <=> over.tabIndex = infinity
    return over.tabIndex < start.tabIndex ?
        ((over.tabIndex <= tabIndex &&
          tabIndex < start.tabIndex) ? start.width : 0) :
        ((start.tabIndex < tabIndex &&
          (tabIndex <= over.tabIndex ||
           over.tabIndex === undefined)) ? -start.width : 0);
};

const getPanesDict = createDeepEqualSelector(
    [getPanes, getTabs, getDragStartData, getDragOverData],
    (panes, tabsDict, start, over) => panes
        .reduce((acc, {paneId, tabs, activeTabOrder}, paneIndex) => ({
            ...acc,
            [paneId]: {
                paneId,
                paneIndex,
                tabs: tabs.map((tabId, tabIndex) => ({
                    tabId,
                    ...tabsDict[tabId],
                    active: tabId === activeTabOrder[0],
                    xTranslation: getXTranslation(start, over, paneId, tabIndex),
                })),
                activeTab: {
                    ...tabsDict[activeTabOrder[0]],
                    tabId: activeTabOrder[0],
                },
            },
        }), {}),
);

export const getPane = (state, {paneId}) => getPanesDict(state)[paneId];
export const getPaneIndex = (state, {paneId}) => {
    const {paneIndex} = getPanesDict(state)[paneId] || {};
    return paneIndex;
};

export const getMoveData = createDeepEqualSelector(
    [getDragStartData, getDragOverData],
    (start, over) => start && over ? {
        paneIdFrom: start.paneId,
        tabId: start.tabId,
        paneIdTo: over.paneId,
        tabIndex: over.tabIndex,
    } : {},
);

export const getMoveIntoNewPaneData = createDeepEqualSelector(
    [getDragStartData, getDragOverData],
    (start, over) => start && over ? {
        paneIdFrom: start.paneId,
        tabId: start.tabId,
        paneIndex: over.paneIndex,
    } : {},
);

export const getOverredPanel = createDeepEqualSelector(
    [getDragOverData],
    (overData = {}) => overData.overredPanel,
);

const getActiveTabsList = state => createDeepEqualSelector(
    [getPanes],
    panes => panes.map(pane => pane.activeTabOrder[0]),
);

const getTabsDict = createDeepEqualSelector(
    [getTabs, getActiveTabsList],
    (tabs, activeTabs) => Object.keys(tabs).reduce((acc, tabId) => ({
        ...acc,
        [tabId]: {
            ...tabs[tabId],
            tabId,
            active: activeTabs.includes(tabId),
        },
    })),
);

export const getTab = (state, {tabId}) => getTabsDict(state)[tabId];

export const getActivePane = state => getActivePaneList(state)[0];


export default {
    dragActive,
    getActivePane,
    getDragData,
    getMoveData,
    getMoveIntoNewPaneData,
    getPane,
    getPaneIndex,
    getPaneIdList,
    getOverredPanel,
    getTab,
};
