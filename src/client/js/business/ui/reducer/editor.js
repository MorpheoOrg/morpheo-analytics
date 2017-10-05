import {actionsTypes} from '../actions/editor';
import uuidv4 from 'uuid/v4';

const initialState = {
    panes: [],
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.addGroup: {
        const {value, id} = payload;
        const uuid = uuidv4();  // TODO change by the uuid items from sidebar
        return {
            ...state,
            panes: [
                ...state.panes,
                // add default tab to group
                {
                    tabs: [{value, id: uuid}],
                    selected: uuid,
                    id,
                },
            ],
        };
    }

    case actionsTypes.addTab: {
        const {groupId, tabId, value} = payload;

        return {
            ...state,
            panes: state.panes.reduce((p, c) => [
                ...p,
                (c.id === groupId ? {
                    ...c,
                    tabs: [...c.tabs, {value, id: tabId}], // FIXME for index at pos if necessary, with slice
                    selected: tabId,
                } : c),
            ], []),
        };
    }

    case actionsTypes.closeTab: {
        const {groupId, tabId} = payload;

        return {
            ...state,
            panes: state.panes.reduce((p, c) => {
                const newTabs = c.tabs.filter(tab => tab.id !== tabId);
                return [
                    ...p,
                    ...(c.id === groupId ?
                        (c.tabs.length > 1 ? [{
                            ...c,
                            tabs: newTabs,
                            selected: newTabs[newTabs.length - 1].id,
                        }] : []) :
                        [c]),
                ];
            }, []),
        };
    }

    case actionsTypes.selectTab: {
        const {id, selected} = payload;

        return {
            ...state,
            panes: state.panes.reduce((p, c) => [
                ...p,
                (c.id === id ? {
                    ...c,
                    selected,
                } : c),
            ], []),
        };
    }

    case actionsTypes.moveTab: {
        const {fromGroupId, fromTabId, toGroupId, toTabId} = payload;

        const fromGroup = state.panes.find(group => group.id === fromGroupId),
            toGroup = state.panes.find(group => group.id === toGroupId);

        return {
            ...state,
            panes: state.panes.reduce((p, group) => {
                // if same group, just swap
                if (fromGroupId === toGroupId) {
                    return [
                        ...p,
                        (group.id === fromGroupId ? {
                            ...group,
                            tabs: group.tabs.reduce((pre, tab) => [
                                ...pre,
                                tab.id === toTabId ? fromGroup.tabs.find(o => o.id === fromTabId) :
                                    tab.id === fromTabId ? toGroup.tabs.find(o => o.id === toTabId) : tab,
                            ], []),
                        } : group),
                    ];
                }
                // group to another group, add to toGroup at index and remove from fromGroup
                else {
                    //memoize
                    const fromGroupTabs = fromGroup.tabs.filter(tab => tab.id !== fromTabId);
                    return [
                        ...p,
                        // remove fromTab from fromGroup and select first tab from fromGroup, remove fromGroup if last tab
                        ...(group.id === fromGroupId ? fromGroup.tabs.length > 1 ? [{
                                ...group,
                                tabs: fromGroupTabs,
                                selected: fromGroupTabs[0].id,
                            }] : [] :
                            // add at correct index, and select it
                            group.id === toGroupId ? [{
                                ...group,
                                tabs: typeof toTabId === 'undefined' ? // add last
                                    [...group.tabs, fromGroup.tabs.find(o => o.id === fromTabId)] :
                                    group.tabs.reduce((pre, tab) => [ // add at index
                                        ...pre,
                                        ...(tab.id === toTabId ? [fromGroup.tabs.find(o => o.id === fromTabId), tab] :
                                            [tab]),
                                    ], []),
                                selected: fromTabId,
                            }] : [group]),
                    ];
                }
            }, []),
        };
    }

    default:
        return state;
    }
};
