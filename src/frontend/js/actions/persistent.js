/**
 * Created by guillaume on 2/17/17.
 */
import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => ({
    ...(createRequestActionTypes(`${prefix}_PERSISTENT`)),
    next: createRequestActionTypes(`${prefix}_PERSISTENT_NEXT`),
});

export const actions = actionTypes => ({
    request: createAction(actionTypes.REQUEST),
    success: createAction(actionTypes.SUCCESS),
    failure: createAction(actionTypes.FAILURE),
    next: {
        request: createAction(actionTypes.next.REQUEST),
        success: createAction(actionTypes.next.SUCCESS),
        failure: createAction(actionTypes.next.FAILURE),
    },
});

export default {
    actions,
    actionTypes,
};
