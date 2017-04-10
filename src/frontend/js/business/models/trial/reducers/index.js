/**
 * Created by guillaume on 3/6/17.
 */
import {actionTypes} from '../actions';

import {
    modal,
} from '../../../../reducers';

import item from './item';

export default {
    item,
    modal: modal(actionTypes),
};
