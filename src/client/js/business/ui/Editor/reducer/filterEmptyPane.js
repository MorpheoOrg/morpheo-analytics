import {actionsTypes} from '../actions';


const initialState = {
    activePaneOrder: [],
    panes: [],
    tabs: {},
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.closeTab: {
        const {activePaneOrder, panes, tabs} = state;
        const emptyPaneId = state.panes
            .filter(({tabs}) => tabs.length === 0)
            .map(({paneId}) => paneId);
        return {
            activePaneOrder:
                activePaneOrder.filter(id => !emptyPaneId.includes(id)),
            panes: panes.filter(({paneId}) => !emptyPaneId.includes(paneId)),
            tabs,
        };
    }

    default:
        return state;
    }
};