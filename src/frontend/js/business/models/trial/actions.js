/**
 * Created by guillaume on 3/6/17.
 */

import {createAction} from 'redux-actions';

import {actions as itemActions, actionTypes as itemActionTypes} from '../../../actions/item';
import {actions as modalActions, actionTypes as modalActionTypes} from '../../../actions/modal';


const prefix = 'MODELS::TRIAL';

export const actionTypes = {
    item: {
        ...itemActionTypes(`${prefix}`),
        isExpanded: {
            SET: `${prefix}_ITEM_IS_EXPANDED_SET`,
        },
    },
    modal: modalActionTypes(`${prefix}`),
};

const actions = {
    item: {
        isExpanded: {
            set: createAction(actionTypes.item.isExpanded.SET),
        },
        ...itemActions(actionTypes.item),
    },
    modal: modalActions(actionTypes.modal),
};

export default actions;
