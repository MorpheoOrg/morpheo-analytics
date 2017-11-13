import {createAction} from 'redux-actions';

export const actionsTypes = {
    addGroup: 'EDITOR::ADD_GROUP',
    addTab: 'EDITOR::ADD_TAB',
    selectTab: 'EDITOR::SELECT_TAB',
    closeTab: 'EDITOR::CLOSE_TAB',
    moveTab: 'EDITOR::MOVE_TAB',
    updateTabContent: 'EDITOR::UPDATE_TAB_CONTENT'
};

export default {
    addGroup: createAction(actionsTypes.addGroup),
    addTab: createAction(actionsTypes.addTab),
    selectTab: createAction(actionsTypes.selectTab),
    closeTab: createAction(actionsTypes.closeTab),
    moveTab: createAction(actionsTypes.moveTab),
    updateTabContent: createAction(actionsTypes.updateTabContent),
};
