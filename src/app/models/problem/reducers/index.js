import list from './list';
import item from './item';
import {actionTypes} from '../actions';


export default {
    list: list(actionTypes),
    item: item(actionTypes),
};
