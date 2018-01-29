/**
 * Set of actions of the tab
 * @alias actions:editor:tab
 */
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import {createActionWithCheck} from '../../../../utils/redux-actions';


/** Set of action types for the tab. */
export const actionsTypes = {
    add: 'EDITOR::TAB::ADD',
    remove: 'EDITOR::TAB::REMOVE',
    setActive: 'EDITOR::TAB::SET_ACTIVE',
    move: 'EDITOR::TAB::MOVE',
    moveIntoNewPane: 'EDITOR::TAB::MOVE_INTO_NEW_PANE',
    dragStart: 'EDITOR::TAB::DRAG_START',
    dragOver: 'EDITOR::TAB::DRAG_OVER',
    dragOut: 'EDITOR::TAB::DRAG_OUT',
    dragEnd: 'EDITOR::TAB::DRAG_END',
    updateProps: 'EDITOR::TAB::UPDATE_CONTEXT_DATA',
};

/**
 * @module Editor/actions/tab
 */
export default {
    /**
     * Add a new tab from the content provided into the corresponding pane.
     *
     * @function
     * @param {Object} payload -
     *      Action payload.
     * @param {string} payload.contentId -
     *      Id of the content displayed by the Editor.
     * @param {string} [payload.contentType='problem'] -
     *      Type of the content displayed by the Editor.
     * @param {string} [payload.paneId] -
     *      Id of the pane to add the tab. If not specified it will
     *      generate an uuid.
     * @param {string} payload.title -
     *      Title displayed by the tab.
     * @param {number} [payload.tabIndex] -
     *      Index where to add the tab. If undefined or greater than the
     *      number of tabs, the tab is added at the end.
    */
    add: createActionWithCheck(actionsTypes.add, {
        contentId: PropTypes.string.isRequired,
        contentType: PropTypes.string,
        title: PropTypes.string.isRequired,
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        tabIndex: PropTypes.number,
    }, props => ({
        ...props,
        paneId: props.paneId ? props.paneId : uuidv4(),
        tabId: uuidv4()})
    ),

    /**
     * Close the corresponding tab. The active tab will be the previous
     * activated tab. If the pane is empty, it will be removed.
     *
     * @param {Object} payload -
     *      Action payload.
     * @param {string} payload.paneId -
     *       Id of the pane to add the tab.
     * @param {string} payload.tabId -
     *       Id of the tab.
     */
    remove: createActionWithCheck(actionsTypes.remove, {
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
    }),

    /**
     * Set the corresponding tab to active.
     *
     * @param {string} payload.paneId -
     *       Id of the pane to add the tab.
     * @param {string} payload.tabId -
     *       Id of the tab.
     */
    setActive: createActionWithCheck(actionsTypes.setActive, {
        paneId: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
    }),

    /**
     * Move an existing tab into from an existing pane to a new pane.
     * If `paneFrom` is empty it will be removed.
     *
     * @param {string} payload.paneIdFrom -
     *       Id of the pane from where the tab is extracted.
     * @param {string} payload.tabId -
     *       Id of the tab.
     * @param {number} [payload.paneIndex] -
     *       Index where the pane will be inserted. If undefined or greater than
     *       the number of panes, the pane will be added at the end.
     */
    moveIntoNewPane: createActionWithCheck(
        actionsTypes.moveIntoNewPane,
        {
            paneIdFrom: PropTypes.string.isRequired,
            tabId: PropTypes.string.isRequired,
            paneIndex: PropTypes.number,
            paneId: PropTypes.string.isRequired,
        },
        props => ({...props, paneId: uuidv4()}),
    ),

    /**
     * Move an existing tab into from an existing pane to an existing pane.
     * If `paneFrom` is empty it will be removed.
     *
     * @param {string} payload.paneIdFrom -
     *       Id of the pane from where the tab is extracted.
     * @param {string} payload.tabId -
     *       Id of the tab.
     * @param {string} payload.paneIdTo -
     *       Id of the pane where the tab is moved.
     * @param {number} [payload.paneIndex] -
     *       Position of paneIdTo where the tab is moved. If not specified,
     *       the tab will be add to the end.
     */
    move: createActionWithCheck(actionsTypes.move, {
        paneIdFrom: PropTypes.string.isRequired,
        tabId: PropTypes.string.isRequired,
        paneIdTo: PropTypes.string.isRequired,
        tabIndex: PropTypes.number,
    }),
    // TODO
    dragStart: createActionWithCheck(actionsTypes.dragStart),
    dragOver: createActionWithCheck(actionsTypes.dragOver),
    dragOut: createActionWithCheck(actionsTypes.dragOut),
    dragEnd: createActionWithCheck(actionsTypes.dragEnd),
    /**
     * Update the props of a tab. You can use it to add a different context
     * for each tab.
     */
    updateProps: createActionWithCheck(
        actionsTypes.updateProps, {
            tabId: PropTypes.string.isRequired,
            props: PropTypes.shape({}),
        }
    ),
};
