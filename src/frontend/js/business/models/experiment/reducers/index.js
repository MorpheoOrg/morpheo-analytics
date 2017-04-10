import {actionTypes} from '../actions';
import {
    list,
    modal,
} from '../../../../reducers';

import item from './item';
import listUser from './listUser';
import filters from './filters';
import widget from './widget';
import chart from './chart';
import suggestions from './suggestions';

export default {
    user: {
        list: listUser(actionTypes),
    },
    shared_with: {
        list: list(actionTypes.shared_with),
    },
    item: item(actionTypes),
    modal: modal(actionTypes),
    filters: filters(actionTypes),
    chart: chart(actionTypes),
    widget: widget(actionTypes),
    suggestions: suggestions(actionTypes),
};
