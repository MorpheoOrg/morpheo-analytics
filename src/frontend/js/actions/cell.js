import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => ({
    SET: `${prefix}CELL_SET`,
    create: createRequestActionTypes(`${prefix}_CELL_CREATE`),
    get: createRequestActionTypes(`${prefix}_CELL_GET`),
    update: createRequestActionTypes(`${prefix}_CELL_UPDATE`),
    delete: createRequestActionTypes(`${prefix}_CELL_DELETE`),
});

export const actions = actionTypes => ({
    set: createAction(actionTypes.SET),
    get: {
        request: createAction(actionTypes.get.REQUEST),
        success: createAction(actionTypes.get.SUCCESS),
        failure: createAction(actionTypes.get.FAILURE),
    },
    create: {
        request: createAction(actionTypes.create.REQUEST),
        success: createAction(actionTypes.create.SUCCESS),
        failure: createAction(actionTypes.create.FAILURE),
    },
    update: {
        request: createAction(actionTypes.update.REQUEST),
        success: createAction(actionTypes.update.SUCCESS),
        failure: createAction(actionTypes.update.FAILURE),
    },
    delete: {
        request: createAction(actionTypes.delete.REQUEST),
        success: createAction(actionTypes.delete.SUCCESS),
        failure: createAction(actionTypes.delete.FAILURE),
    },
});


export default {
    actions,
    actionTypes,
};
