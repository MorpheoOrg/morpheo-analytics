import {createAction} from 'redux-actions';
import createRequestActionTypes from '../../actions/createRequestActionTypes';

const prefix = 'MORPHEO';

export const actionTypes = {
    save: createRequestActionTypes(`${prefix}__CELL_AVE`),

    SET: `${prefix}_CELL_SET`,
    SET_LANGUAGE: `${prefix}_CELL_SET_LANGUAGE`,
    SET_ACTIVE: `${prefix}_CELL_SET_ACTIVE`,
    SET_SLATE: `${prefix}_CELL_SET_SLATE`,
    ADD: `${prefix}_CELL_ADD`,
    REMOVE: `${prefix}_CELL_REMOVE`,
    INSERT_AFTER: `${prefix}_CELL_INSERT_AFTER`,
    INSERT_BEFORE: `${prefix}_CELL_INSERT_BEFORE`,
};

export default {
    save: {
        request: createAction(actionTypes.save.REQUEST),
        success: createAction(actionTypes.save.SUCCESS),
        failure: createAction(actionTypes.save.FAILURE),
    },

    set: createAction(actionTypes.SET),
    setLanguage: createAction(actionTypes.SET_LANGUAGE),
    setActive: createAction(actionTypes.SET_ACTIVE),
    setSlate: createAction(actionTypes.SET_SLATE),
    add: createAction(actionTypes.ADD),
    remove: createAction(actionTypes.REMOVE),
    insertAfter: createAction(actionTypes.INSERT_AFTER),
    insertBefore: createAction(actionTypes.INSERT_BEFORE),
};
