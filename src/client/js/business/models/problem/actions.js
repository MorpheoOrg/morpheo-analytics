import {
    actions as listActions,
    actionTypes as listActionTypes
} from '../../../actions/list';
import {
    actions as itemActions,
    actionTypes as itemActionTypes
} from '../../../actions/item';


const prefix = 'MODELS::PROBLEM';

export const actionTypes = {
    list: listActionTypes(prefix),
    item: itemActionTypes(prefix),
};

const actions = {
    list: listActions(actionTypes.list),
    item: itemActions(actionTypes.item),
};

export default actions;
