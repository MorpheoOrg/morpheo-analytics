/**
 * Created by guillaume on 3/6/17.
 */

import {actions as listActions, actionTypes as listActionTypes} from '../../../actions/list';
const prefix = 'MODELS::LEARNUPLET';

export const actionTypes = {
    list: listActionTypes(`${prefix}`),
};

const actions = {
    list: listActions(actionTypes.list),
};

export default actions;
