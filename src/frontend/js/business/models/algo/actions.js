/**
 * Created by guillaume on 3/6/17.
 */

import {createAction} from 'redux-actions';

import {actions as itemActions, actionTypes as itemActionTypes} from '../../../actions/item';
import {actions as modalActions, actionTypes as modalActionTypes} from '../../../actions/modal';

import createRequestActionTypes from '../../../actions/createRequestActionTypes';


const prefix = 'MODELS::ALGO';

export const actionTypes = {
    item: {
        ...itemActionTypes(`${prefix}`),
        post: createRequestActionTypes(`${prefix}_ITEM_POST`),
        postToOrchestrator: createRequestActionTypes(`${prefix}_ITEM_POST_ORCHESTRATOR`),
    },
    modal: modalActionTypes(`${prefix}`),
};

const actions = {
    item: {
        ...itemActions(actionTypes.item),
        post: {
            request: createAction(actionTypes.item.post.REQUEST),
            success: createAction(actionTypes.item.post.SUCCESS),
            failure: createAction(actionTypes.item.post.FAILURE),
        },
        postToOrchestrator: {
            request: createAction(actionTypes.item.postToOrchestrator.REQUEST),
            success: createAction(actionTypes.item.postToOrchestrator.SUCCESS),
            failure: createAction(actionTypes.item.postToOrchestrator.FAILURE),
        },
    },
    modal: modalActions(actionTypes.modal),
};

export default actions;
