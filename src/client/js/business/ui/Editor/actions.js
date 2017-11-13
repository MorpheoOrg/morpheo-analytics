import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

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
    /**
     * Add a new group containing a new tab from the content provided.
     *
     * @param {Object} payload - Action payload.
     * @param {string} payload.contentId -
     *      Id of the content displayed by the Editor.
     * @param {string} [payload.contentType='problem'] -
     *      Type of the content displayed by the Editor.
     * @param {string} payload.title -
     *      Title displayed by the tab.
     */
    addGroup: createActionWithCheck(actionsTypes.addGroup, {
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        title: PropTypes.string.isRequired,
        tabId: PropTypes.string,
        groupId: PropTypes.string,
    }, props => ({...props, groupId: uuidv4(), tabId: uuidv4()})),
    /**
    * Add a new tab from the content provided into the corresponding group.
    *
    * @param {Object} payload - Action payload.
    * @param {string} payload.contentId -
    *      Id of the content displayed by the Editor.
    * @param {string} [payload.contentType='problem'] -
    *      Type of the content displayed by the Editor.
    * @param {string} payload.groupId -
    *      Id of the group to add the tab.
    * @param {string} payload.title -
    *      Title displayed by the tab.
    */
    addTab: createActionWithCheck(actionsTypes.addTab, {
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        title: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        groupId: PropTypes.string.isRequired,
    }, props => ({...props, tabId: uuidv4()})),
    selectTab: createActionWithCheck(actionsTypes.selectTab),
    closeTab: createActionWithCheck(actionsTypes.closeTab),
    moveTab: createActionWithCheck(actionsTypes.moveTab),
    updateTabContent: createActionWithCheck(actionsTypes.updateTabContent),
};