import PropTypes from 'prop-types';
import {createActionWithCheck} from '../../../utils/redux-actions';


export const actionsTypes = {
    addGroup: 'EDITOR::ADD_GROUP',
    addTab: 'EDITOR::ADD_TAB',
    selectTab: 'EDITOR::SELECT_TAB',
    closeTab: 'EDITOR::CLOSE_TAB',
    moveTab: 'EDITOR::MOVE_TAB',
    updateTabContent: 'EDITOR::UPDATE_TAB_CONTENT',
};


export default {
    addGroup: createActionWithCheck(actionsTypes.addGroup, {
        toto: PropTypes.string.isRequired,
    }),
    addTab: createActionWithCheck(actionsTypes.addTab),
    selectTab: createActionWithCheck(actionsTypes.selectTab),
    closeTab: createActionWithCheck(actionsTypes.closeTab),
    moveTab: createActionWithCheck(actionsTypes.moveTab),
    updateTabContent: createActionWithCheck(actionsTypes.updateTabContent),
};