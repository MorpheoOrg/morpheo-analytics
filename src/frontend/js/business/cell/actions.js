import {createAction} from 'redux-actions';

const prefix = 'MORPHEO';

export const actionTypes = {
    SET: `${prefix}_CELL_SET`,
    ADD: `${prefix}_CELL_ADD`,
    REMOVE: `${prefix}_CELL_REMOVE`,
};

export default {
    set: createAction(actionTypes.SET),
    add: createAction(actionTypes.ADD),
    remove: createAction(actionTypes.REMOVE),
};
