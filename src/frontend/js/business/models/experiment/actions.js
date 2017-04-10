import {createAction} from 'redux-actions';
import createRequestActionTypes from '../../../actions/createRequestActionTypes';

import {actions as listActions, actionTypes as listActionTypes} from '../../../actions/list';
import {actions as itemActions, actionTypes as itemActionTypes} from '../../../actions/item';
import {actions as modalActions, actionTypes as modalActionTypes} from '../../../actions/modal';

const prefix = 'MODELS::EXPERIMENT';

export const actionTypes = {

    user: {
        list: listActionTypes(`${prefix}_USER`),
    },
    shared_with: {
        list: listActionTypes(`${prefix}_SHARED_WITH`),
    },
    item: itemActionTypes(prefix),
    modal: modalActionTypes(prefix),
    filters: {
        order: {
            SET: `${prefix}_FILTERS_ORDER_SET`,
        },
        desc: {
            SET: `${prefix}_FILTERS_DESC_SET`,
        },
        limit: {
            SET: `${prefix}_FILTERS_LIMIT_SET`,
        },
        algo: {
            SET: `${prefix}_FILTERS_ALGO_SET`,
        },

    },
    chart: {
        selectedMetric: {
            SET: `${prefix}_CHART_SELECTED_METRIC_SET`,
        },
        selectedParameter: {
            SET: `${prefix}_CHART_SELECTED_PARAMETER_SET`,
        }
    },
    widget: {
        scatter: {
            x: {
                SET: `${prefix}_WIDGET_SCATTER_X_SET`,
            },
            y: {
                SET: `${prefix}_WIDGET_SCATTER_Y_SET`,
            },
        },
    },
    suggestions: createRequestActionTypes(`${prefix}_SUGGESTIONS`),
};

const actions = {
    user: {
        list: listActions(actionTypes.user.list),
    },
    shared_with: {
        list: listActions(actionTypes.shared_with.list),
    },
    item: itemActions(actionTypes.item),
    modal: modalActions(actionTypes.modal),
    filters: {
        order: {
            set: createAction(actionTypes.filters.order.SET),
        },
        desc: {
            set: createAction(actionTypes.filters.desc.SET),
        },
        limit: {
            set: createAction(actionTypes.filters.limit.SET),
        },
        algo: {
            set: createAction(actionTypes.filters.algo.SET),
        },
    },
    chart: {
        selectedMetric: {
            set: createAction(actionTypes.chart.selectedMetric.SET),
        },
        selectedParameter: {
            set: createAction(actionTypes.chart.selectedParameter.SET),
        },
    },
    widget: {
        scatter: {
            x: {
                set: createAction(actionTypes.widget.scatter.x.SET),
            },
            y: {
                set: createAction(actionTypes.widget.scatter.y.SET),
            },
        },
    },
    suggestions: {
        request: createAction(actionTypes.suggestions.REQUEST),
        success: createAction(actionTypes.suggestions.SUCCESS),
        failure: createAction(actionTypes.suggestions.FAILURE),
    }
};

export default actions;
