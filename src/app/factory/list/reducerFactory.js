const initialState = {
    init: false,
    loading: false,
    error: null,
    results: {},
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.reset:
            return initialState;
        case actionTypes.request:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.success: {
            const {list} = payload;
            return {
                ...state,
                results: {
                    ...state.results,
                    ...list
                },
                init: true,
                error: null,
                loading: false,
            };
        }
        case actionTypes.failure: {
            const {error} = payload;
            return {
                ...state,
                loading: false,
                error,
            };
        }
        default:
            return state;
        }
    };

