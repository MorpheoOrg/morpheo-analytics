import {createAction} from 'redux-actions';

const prefix = 'MORPHEO';

export const actionTypes = {
    SET: `${prefix}_CELL_SET`,
    SET_LANGUAGE: `${prefix}_CELL_SET_LANGUAGE`,
    SET_SLATE: `${prefix}_CELL_SET_SLATE`,
    ADD: `${prefix}_CELL_ADD`,
    REMOVE: `${prefix}_CELL_REMOVE`,
};

export default {
    set: createAction(actionTypes.SET),
    setLanguage: createAction(actionTypes.SET_LANGUAGE),
    setSlate: createAction(actionTypes.SET_SLATE),
    add: createAction(actionTypes.ADD),
    remove: createAction(actionTypes.REMOVE),
};
