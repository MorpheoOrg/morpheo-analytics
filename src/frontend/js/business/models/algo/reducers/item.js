import {actionTypes} from '../actions';

const initialState = {
    results: {},
    loading: true,
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionTypes.item.get.FAILURE:
    case actionTypes.item.post.FAILURE:
    case actionTypes.item.create.FAILURE:
    case actionTypes.item.update.FAILURE:
    case actionTypes.item.delete.FAILURE:
        return {
            ...state,
            loading: false,
            error: payload,
        };
    case actionTypes.item.get.REQUEST:
    case actionTypes.item.update.REQUEST:
        return {
            ...state,
            loading: true,
        };
    case actionTypes.item.get.SUCCESS:
        return {
            ...state,
            results: {
                ...state.results,
                [payload.id]: payload.list,
            },
            loading: false,
        };
    case actionTypes.item.create.SUCCESS:
        return {
            ...state,
            results: {
                ...state.results,
                [payload.experiment]: [
                    ...state.results[payload.experiment],
                    payload,
                ],
            },
            loading: false,
        };
    case actionTypes.item.delete.SUCCESS:
        return {
            ...state,
            results: Object.keys(state.results).reduce((previous, current) =>
                        ({
                            ...previous,
                            [current]: state.results[current].filter(o => o.id !== payload),
                        })
                    , {}),
            loading: false,
        };


    default:
        return state;
    }
};

