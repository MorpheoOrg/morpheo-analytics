import {actionTypes} from '../actions';

import list from './list';
import item from './item';

export default {
    list: list(actionTypes),
    item: item(actionTypes),
};
