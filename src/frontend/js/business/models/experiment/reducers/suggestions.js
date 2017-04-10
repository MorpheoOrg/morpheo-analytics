const initialState = {
    results: [],
    loading: false,
    error: null,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.suggestions.REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.suggestions.SUCCESS:
            return {
                ...state,
                results: payload,
                loading: false,
                error: null,
            };
        case actionTypes.suggestions.FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
        }
    };

