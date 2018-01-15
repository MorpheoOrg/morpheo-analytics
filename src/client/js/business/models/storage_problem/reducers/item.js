const initialState = {
    id: null,
    loading: false,
    error: null,
    results: {},
};


export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.item.SET:
            return {
                ...state,
                id: payload,
            };
        case actionTypes.item.get.REQUEST:
            return {
                ...state,
                results: {...state.results, [payload]: {loading: true}},
                loading: true,
            };
        case actionTypes.item.get.SUCCESS:
            return {
                ...state,
                results: {
                    ...state.results,
                    ...({...payload, loading: false}),
                },
                loading: false,
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                id: null,
                loading: false,
            };
        case actionTypes.item.get.FAILURE:
        case actionTypes.item.create.FAILURE:
        case actionTypes.item.update.FAILURE:
        case actionTypes.item.delete.FAILURE:
            return {
                ...state,
                error: payload,
                results: Object.keys(state.results).reduce((p, c) => (
                    {...p, [c]: {...state.results[c], loading: false}}
                ), {}),
                loading: false,
            };
        default:
            return state;
        }
    };
