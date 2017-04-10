/**
 * Created by guillaume on 2/17/17.
 */
import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => ({
    set: createRequestActionTypes(`${prefix}_PAGINATION_SET`, ['REQUEST', 'SUCCESS']),
    RESET: `${prefix}_PAGINATION_RESET`,
    BUILD: `${prefix}_PAGINATION_BUILD`,
});

export const actions = actionTypes => ({
    set: {
        request: createAction(actionTypes.set.REQUEST),
        success: createAction(actionTypes.set.SUCCESS),
    },
    reset: createAction(actionTypes.RESET),
    build: createAction(actionTypes.BUILD),
});


export default {
    actions,
    actionTypes,
};
