import createDeepEqualSelector from '../../utils/selector';


const selectedIndex = state => state.settings.sideBar.selectedIndex;
const panes = state => state.settings.editor.panes;
const tabs = state => state.settings.editor.tabs;

export const getVisible = createDeepEqualSelector(
    [selectedIndex],
    selectedIndex => !!~selectedIndex,
);

export const getPanes = createDeepEqualSelector(
    [panes, tabs],
    (panes, tabs) => panes.map(({paneId, tabs: paneTabs, selected}) => ({
        key: paneId,
        id: paneId,
        tabs: paneTabs.map(tabId => ({
            ...tabs[tabId],
            key: tabId,
            id: tabId,
            selected: tabId === selected,
        })),
        selectedTab: {
            ...tabs[selected],
            tabId: selected,
        },
    })),
);


export default {
    getPanes,
    getVisible,
};
