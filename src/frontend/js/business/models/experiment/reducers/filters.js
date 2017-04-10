const initialState = {
    order: 'date',
    desc: 'true',
    limit: '30',
    algo: null,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.filters.order.SET:
            return {
                ...state,
                order: payload,
            };
        case actionTypes.filters.desc.SET:
            return {
                ...state,
                desc: payload,
            };
        case actionTypes.filters.limit.SET:
            return {
                ...state,
                limit: payload,
            };
        case actionTypes.filters.algo.SET:
            return {
                ...state,
                algo: payload,
            };
        default:
            return state;
        }
    };

