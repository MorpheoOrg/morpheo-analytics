/**
 * Created by guillaume on 2/17/17.
 */
import {createAction} from 'redux-actions';

export const actionTypes = prefix => ({
    create: {
        SET: `${prefix}_MODAL_CREATE_SET`,
    },
    update: {
        SET: `${prefix}_MODAL_UPDATE_SET`,
    },
    delete: {
        SET: `${prefix}_MODAL_DELETE_SET`,
    },
});

export const actions = actionTypes => ({
    create: {
        set: createAction(actionTypes.create.SET),
    },
    update: {
        set: createAction(actionTypes.update.SET),
    },
    delete: {
        set: createAction(actionTypes.delete.SET),
    },
});

export default {
    actions,
    actionTypes,
};
