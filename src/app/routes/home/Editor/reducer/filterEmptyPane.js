import {actionsTypes} from '../actions';


const initialState = {
    activePaneOrder: [],
    panes: [],
    tabs: {},
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.tab.move:
    case actionsTypes.tab.moveIntoNewPane:
    case actionsTypes.tab.remove: {
        const {
            activePaneOrder, dragInfos, panes, tabs,
        } = state;
        const emptyPaneId = state.panes
            .filter(({tabs}) => tabs.length === 0)
            .map(({paneId}) => paneId);
        return {
            dragInfos,
            tabs,
            activePaneOrder:
                activePaneOrder.filter(id => !emptyPaneId.includes(id)),
            panes: panes.filter(({paneId}) => !emptyPaneId.includes(paneId)),
        };
    }

    default:
        return state;
    }
};
