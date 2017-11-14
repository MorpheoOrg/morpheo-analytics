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
     * @param {number} [payload.paneIndex] -
     *      Index where the pane will be inserted. If undefined or greater than
     *      the number of panes, the pane will be added at the end.*
     */
    addGroup: createActionWithCheck(actionsTypes.addGroup, {
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        title: PropTypes.string.isRequired,
        paneId: PropTypes.string,
        tabId: PropTypes.string,
        paneIndex: PropTypes.number,
    }, props => ({...props, groupId: uuidv4(), tabId: uuidv4()})),
    /**
     * Add a new tab from the content provided into the corresponding group.
     *
     * @param {Object} payload -
     *      Action payload.
     * @param {string} payload.contentId -
     *      Id of the content displayed by the Editor.
     * @param {string} [payload.contentType='problem'] -
     *      Type of the content displayed by the Editor.
     * @param {string} payload.paneId -
     *      Id of the group to add the tab.
     * @param {string} payload.title -
     *      Title displayed by the tab.
     * @param {number} [payload.tabIndex] -
     *      Index where to add the tab. If undefined or greater than the
     *      number of tabs, the tab is added at the end.
    */
    addTab: createActionWithCheck(actionsTypes.addTab, {
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        title: PropTypes.string.isRequired,
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        tabIndex: PropTypes.number,
    }, props => ({...props, tabId: uuidv4()})),
    /**
     * Set the corresponding tab to active.
     *
     * @param {string} payload.paneId -
     *       Id of the group to add the tab.
     * @param {string} payload.tabId -
     *       Id of the tab.
     */
    selectTab: createActionWithCheck(actionsTypes.selectTab, {
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
    }),
    /**
     * Close the corresponding tab. The active tab will be the last activated
     * tab. If the pane is empty, it will be closed.
     *
     * @param {string} payload.paneId -
     *       Id of the group to add the tab.
     * @param {string} payload.tabId -
     *       Id of the tab.
     */
    closeTab: createActionWithCheck(actionsTypes.closeTab, {
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
    }),
    moveTab: createActionWithCheck(actionsTypes.moveTab, {
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
    }),
    // Add other moveTab: internal, external or to a new pane
    updateTabContent: createActionWithCheck(actionsTypes.updateTabContent),
};