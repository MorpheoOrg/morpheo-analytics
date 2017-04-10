/**
 * Created by guillaume on 2/17/17.
 */
import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => ({
    ...createRequestActionTypes(`${prefix}_LIST`, ['REQUEST', 'SUCCESS', 'FAILURE', 'RESET', 'REQUEST_ITEM', 'UPDATE']),
});

export const actions = actionTypes => ({
    request: createAction(actionTypes.REQUEST),
    success: createAction(actionTypes.SUCCESS),
    failure: createAction(actionTypes.FAILURE),
    reset: createAction(actionTypes.RESET),
    request_item: createAction(actionTypes.REQUEST_ITEM),
    update: createAction(actionTypes.UPDATE),
});

export default {
    actions,
    actionTypes,
};
