import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';


export const actionTypes = prefix => ({
    ...createRequestActionTypes(
        `${prefix}_LIST`,
        ['REQUEST', 'SUCCESS', 'FAILURE', 'RESET', 'UPDATE']
    ),
});

export const actions = actionTypes => ({
    request: createAction(actionTypes.REQUEST),
    success: createAction(actionTypes.SUCCESS),
    failure: createAction(actionTypes.FAILURE),
    reset: createAction(actionTypes.RESET),
    update: createAction(actionTypes.UPDATE),
});

export default {
    actions,
    actionTypes,
};
