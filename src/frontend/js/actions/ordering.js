/**
 * Created by guillaume on 2/17/17.
 */
import {createAction} from 'redux-actions';
import createRequestActionTypes from './createRequestActionTypes';

export const actionTypes = prefix => createRequestActionTypes(`${prefix}_ORDERING`, ['SET']);

export const actions = actionTypes => ({
    set: createAction(actionTypes.SET),
});

export default {
    actions,
    actionTypes,
};
