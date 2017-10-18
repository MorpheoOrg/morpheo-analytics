import createDeepEqualSelector from '../../utils/selector';


const selectedIndex = state => state.settings.sideBar.selectedIndex;
const panes = state => state.settings.editor.panes;
const tabs = state => state.settings.editor.tabs;

export const getVisible = createDeepEqualSelector(
    [selectedIndex],
    selectedIndex => !!~selectedIndex,
);


// List main information necessary by
const getPanes = createDeepEqualSelector(
    [panes],
    (panes) => panes,
    // (panes, tabs) => panes.map(({id, tabs: paneTabs, selected}) => ({
    //     key: id,
    //     id,
    //     tabs: paneTabs.map(tabId => ({
    //         key: tabId,
    //         ...tabs[tabId],
    //         selected: tabId === selected,
    //     })),
    //     selectedTab: tabs[selected],
    // })),
);


const results = state => state.models.problems.list.results;
const storage_results = state => state.models.storage_problems.item.results;

export const getProblems = createDeepEqualSelector(
    [panes, tabs],
    (panes, tabs) => panes.map(({id, tabs: paneTabs, selected}) => ({
        key: id,
        id,
        tabs: paneTabs.map(tabId => ({
            key: tabId,
            ...tabs[tabId],
            selected: tabId === selected,
        })),
        selectedTab: tabs[selected],
    })),
);

export default {
    getProblems,
    getVisible,
};
