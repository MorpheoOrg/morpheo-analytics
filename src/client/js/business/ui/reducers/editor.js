import {actionsTypes} from '../actions/editor';
import uuidv4 from 'uuid/v4';

const initialState = {
    panes: [],
    tabs: [],
    activePane: undefined,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    // To remove
    case actionsTypes.addGroup: {
        const {value, id: contentId} = payload;
        const uuid = uuidv4(); // TODO change by the uuid items from sidebar
        const tabId = uuidv4(); // TODO change by the uuid items from sidebar
        return {
            ...state,
            // List all the panes
            panes: [
                ...state.panes,
                // add default tab to group
                {
                    tabs: [{value, id: contentId}],
                    selected: contentId,
                    id: uuid,
                },
            ],
            // List all the open tabs
            tabs: {
                ...state.tabs,
                [tabId]: {
                    type: 'problem',
                    title: value,
                    id: contentId,
                },
            },
        };
    }

    case actionsTypes.addTab: {
        const {groupId, id: contentId, value} = payload;
        const tabId = uuidv4(); // TODO change by the uuid items from sidebar

        return {
            ...state,
            panes: state.panes.reduce((p, c) => [
                ...p,
                (c.id === groupId ? {
                    ...c,
                    tabs: [...c.tabs, {value, id: contentId}], // FIXME for index at pos if necessary, with slice
                    selected: contentId,
                } : c),
            ], []),
            tabs: {
                ...state.tabs,
                [tabId]: {
                    type: 'problem',
                    title: value,
                    id: contentId,
                },
            },
            currentPane: groupId,
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
            tabs: Object.keys(state.tabs)
                .filter(k => k !== 't')
                .reduce((p, c) => ({
                    ...p,
                    [c]: state.tabs[c],
                }), {}),
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
                // if same group
                if (fromGroupId === toGroupId) {

                    // get index where to place
                    const index = toTabId ? toGroup.tabs.findIndex(tab => tab.id === toTabId) : toGroup.tabs.length - 1;
                    // exclude
                    const newTabs = fromGroup.tabs.filter(tab => tab.id !== fromTabId);

                    return [
                        ...p,
                        (group.id === fromGroupId ? {
                            ...group,
                            tabs: [
                                ...newTabs.slice(0, index),
                                fromGroup.tabs.find(tab => tab.id === fromTabId) ,
                                ...newTabs.slice(index, newTabs.length)
                            ]
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
                                        ...(tab.id === toTabId ? [fromGroup.tabs.find(o => o.id === fromTabId), tab] : [tab]),
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
