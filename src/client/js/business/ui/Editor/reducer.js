import uuidv4 from 'uuid/v4';
import {actionsTypes} from './actions';

import reducer from './reducer/index';


const initState = {
    panes: [],
    tabs: {},
    activePaneOrder: ['toto'],
};

console.log('YEAP', reducer(initState, {
    type: actionsTypes.addGroup,
    payload: {
        contentId: 'cId',
        tabId: 'tId',
        contentType: 'type',
        paneId: 'gId',
        title: 'test Title',
    }
}));


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
                    tabs: [tabId],
                    selected: tabId,
                    id: uuid,
                },
            ],
            // List all the open tabs
            tabs: {
                ...state.tabs,
                [tabId]: {
                    contentType: 'problem',
                    title: value,
                    contentId,
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
                    tabs: [...c.tabs, tabId], // FIXME for index at pos if necessary, with slice
                    selected: tabId,
                } : c),
            ], []),
            tabs: {
                ...state.tabs,
                [tabId]: {
                    contentType: 'problem',
                    title: value,
                    contentId,
                },
            },
            currentPane: groupId,
        };
    }

    case actionsTypes.updateTabContent: {
        const {tabId, ...content} = payload;
        return {
            ...state,
            tabs: {
                ...state.tabs,
                [tabId]: {
                    ...state.tabs[tabId],
                    ...content,
                },
            },
        };
    }

    case actionsTypes.closeTab: {
        const {groupId, tabId} = payload;

        return {
            ...state,
            panes: state.panes.reduce((p, c) => {
                const newTabs = c.tabs.filter(id => id !== tabId);
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
                .filter(k => k !== tabId)
                .reduce((p, c) => ({
                    ...p,
                    [c]: state.tabs[c],
                }), {}),
        };
    }

    case actionsTypes.selectTab: {
        const {groupId, selected} = payload;

        return {
            ...state,
            panes: state.panes.reduce((p, c) => [
                ...p,
                (c.groupId === groupId ? {
                    ...c,
                    selected,
                } : c),
            ], []),
        };
    }

    case actionsTypes.moveTab: {
        // TODO solve that later
        // const {fromGroupId, fromTabId, toGroupId, toTabId} = payload;

        // const fromGroup = state.panes.find(group => group.id === fromGroupId),
        //     toGroup = state.panes.find(group => group.id === toGroupId);

        // return {
        //     ...state,
        //     panes: state.panes.reduce((p, group) => {
        //         // if same group
        //         if (fromGroupId === toGroupId) {
        //             // get index where to place
        //             const index = toTabId ? toGroup.tabs.findIndex(tab => tab.id === toTabId) : toGroup.tabs.length - 1;
        //             // exclude
        //             const newTabs = fromGroup.tabs.filter(tab => tab.id !== fromTabId);

        //             return [
        //                 ...p,
        //                 (group.id === fromGroupId ? {
        //                     ...group,
        //                     tabs: [
        //                         ...newTabs.slice(0, index),
        //                         fromGroup.tabs.find(tab => tab.id === fromTabId) ,
        //                         ...newTabs.slice(index, newTabs.length)
        //                     ]
        //                 } : group),
        //             ];
        //         }
        //         // group to another group, add to toGroup at index and remove from fromGroup
        //         else {
        //             //memoize
        //             const fromGroupTabs = fromGroup.tabs.filter(tab => tab.id !== fromTabId);
        //             return [
        //                 ...p,
        //                 // remove fromTab from fromGroup and select first tab from fromGroup, remove fromGroup if last tab
        //                 ...(group.id === fromGroupId ? fromGroup.tabs.length > 1 ? [{
        //                         ...group,
        //                         tabs: fromGroupTabs,
        //                         selected: fromGroupTabs[0].id,
        //                     }] : [] :
        //                     // add at correct index, and select it
        //                     group.id === toGroupId ? [{
        //                         ...group,
        //                         tabs: typeof toTabId === 'undefined' ? // add last
        //                             [...group.tabs, fromGroup.tabs.find(o => o.id === fromTabId)] :
        //                             group.tabs.reduce((pre, tab) => [ // add at index
        //                                 ...pre,
        //                                 ...(tab.id === toTabId ? [fromGroup.tabs.find(o => o.id === fromTabId), tab] : [tab]),
        //                             ], []),
        //                         selected: fromTabId,
        //                     }] : [group]),
        //             ];
        //         }
        //     }, []),
        // };
        return state;
    }

    default:
        return state;
    }
};
