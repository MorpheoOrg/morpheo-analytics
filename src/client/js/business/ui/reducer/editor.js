import {actionsTypes} from '../actions/editor';


let key = 0;
let tabKey = 0;

export default (state = [], {type, payload}) => {
    switch (type) {
    case actionsTypes.addGroup: {
        const {groupIndex, value} = payload;
        key += 1;
        tabKey += 1;
        return state.length < 3 ? [
            ...state.slice(0, groupIndex),
            {
                key,
                tabs: [
                    {
                        tabKey,
                        value,
                    },
                ],
                selectedIndex: 0,
            },
            ...state.slice(groupIndex),
        ] : state;
    }

    case actionsTypes.addTab: {
        const {groupIndex, tabIndex, value} = payload;
        const {tabs, selectedIndex} = state[groupIndex];
        tabKey += 1;
        return [
            ...state.slice(0, groupIndex),
            {
                ...state[groupIndex],
                tabs: [
                    ...tabs.slice(0, tabIndex),
                    {
                        tabKey,
                        value,
                    },
                    ...tabs.slice(tabIndex),
                ],
                selectedIndex: selectedIndex + (tabIndex <= selectedIndex),
            },
            ...state.slice(groupIndex + 1),
        ];
    }

    case actionsTypes.removeTab: {
        const {groupIndex, tabIndex} = payload;
        const {tabs, selectedIndex} = state[groupIndex];

        // We remove the group if empty
        if (tabs.length <= 1 && tabIndex === 0) {
            return [
                ...state.slice(0, groupIndex),
                ...state.slice(groupIndex + 1),
            ];
        }

        // Else we remove the tab by updating the selectIndex if nevessary
        return [
            ...state.slice(0, groupIndex),
            {
                ...state[groupIndex],
                tabs: [
                    ...tabs.slice(0, tabIndex),
                    ...tabs.slice(tabIndex + 1),
                ],
                selectedIndex: selectedIndex - (tabIndex <= selectedIndex),
            },
            ...state.slice(groupIndex + 1),
        ];
    }

    case actionsTypes.selectTab: {
        const {groupIndex, selectedIndex} = payload;
        const {tabs} = state[groupIndex];

        // If a wrong selectedIndex is provided
        if (tabs.lenght <= selectedIndex) return state;

        return [
            ...state.slice(0, groupIndex),
            {
                ...state[groupIndex],
                selectedIndex,
            },
            ...state.slice(groupIndex + 1),
        ];
    }

    case actionsTypes.moveTab: {
        const {fromIndex, fromTabIndex, toIndex, toTabIndex} = payload;

        // Assert the element exists
        console.log(state[fromIndex].tabs[fromTabIndex]);
        if (!state[toIndex] ||
            !state[fromIndex] ||
            !state[fromIndex].tabs[fromTabIndex]) {
            // Add a warning !
            return state;
        }

        return state.reduce((cumGroups, group, index) => {
            console.log(index, group);
            const {selectedIndex, tabs} = group;
            if (index === fromIndex) {
                // if origin == destination we internally move the element
                if (index === toIndex) {
                    return [
                        ...cumGroups,
                        {
                            ...group,
                            tabs: fromTabIndex >= toTabIndex ? [
                                ...tabs.slice(0, toTabIndex),
                                tabs[fromTabIndex],
                                ...tabs.slice(toTabIndex, fromTabIndex),
                                ...tabs.slice(fromTabIndex + 1),
                            ] : [
                                ...tabs.slice(0, fromTabIndex),
                                ...tabs.slice(fromTabIndex + 1, toTabIndex + 1),
                                tabs[fromTabIndex],
                                ...tabs.slice(toTabIndex + 1),
                            ],
                            selectedIndex: toTabIndex,
                        },
                    ];
                }
                // if origin we remove the element at fromTabIndex
                else if (tabs.length > 1) {
                    return [
                        ...cumGroups,
                        {
                            ...group,
                            tabs: [
                                ...tabs.slice(0, fromTabIndex),
                                ...tabs.slice(fromTabIndex + 1),
                            ],
                            selectedIndex: selectedIndex !== tabs.length - 1 ? (
                                selectedIndex - (fromTabIndex < selectedIndex)
                            ) : tabs.length - 2,
                        },
                    ];
                }
                // if tab is empty we remove the group
                return cumGroups;
            }
            else if (index === toIndex) {
                // if destination we add the element at toTabIndex
                return [
                    ...cumGroups,
                    {
                        ...group,
                        tabs: [
                            ...tabs.slice(0, toTabIndex),
                            state[fromIndex].tabs[fromTabIndex],
                            ...tabs.slice(toTabIndex),
                        ],
                        selectedIndex: toTabIndex,
                    },
                ];
            }
            // if not origin or destination we return the group
            return [
                ...cumGroups,
                group,
            ];
        }, []);
    }

    default:
        return state;
    }
};
