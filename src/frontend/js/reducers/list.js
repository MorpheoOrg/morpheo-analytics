const initialState = {
    init: false,
    count: 0,
    next: null,
    previous: null,
    results: [],
    error: null,
    loading: false,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.list.REQUEST:
        case actionTypes.list.RESET:
        case actionTypes.list.REQUEST_ITEM:
        // case actionTypes.pagination.set.REQUEST:
            return {
                ...state,
                loading: true,
            };
            case actionTypes.list.SUCCESS:
            return {
                ...state,
                ...payload,
                init: true,
                error: null,
                loading: false,
            };
        case actionTypes.list.FAILURE:
            return {
                ...state,
                count: 0,
                next: null,
                previous: null,
                results: [],
                error: payload,
                loading: false,
            };
        case actionTypes.list.UPDATE:
            return {
                ...state,
                ...payload, // update count, next, previous, results if necessary
            };
        default:
            return state;
        }
    };

