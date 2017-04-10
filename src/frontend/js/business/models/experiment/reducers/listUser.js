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
        case actionTypes.user.list.REQUEST:
        case actionTypes.user.list.RESET:
        case actionTypes.user.list.REQUEST_ITEM:
                // case actionTypes.pagination.set.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.user.list.SUCCESS:
            return {
                ...state,
                ...payload,
                init: true,
                error: null,
                loading: false,
            };
        case actionTypes.user.list.FAILURE:
            return {
                ...state,
                count: 0,
                next: null,
                previous: null,
                results: [],
                error: payload,
                loading: false,
            };
        case actionTypes.user.list.UPDATE:
            return {
                ...state,
                ...payload, // update count, next, previous, results if necessary
            };
        case actionTypes.item.create.SUCCESS:
            return {
                ...state,
                results: [
                    ...state.results,
                    payload,
                ],
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                results: state.results.reduce((previous, current) =>
                            [...previous, ...(current.id !== payload ? [current] : [])],
                        []),
            };
        default:
            return state;
        }
    };

