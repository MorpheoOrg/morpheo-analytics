const initialState = {
    init: false,
    loading: false,
    error: null,
    results: {},
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.list.REQUEST:
        case actionTypes.list.RESET:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.list.SUCCESS: {
            const {problemId, algos} = payload;
            return {
                ...state,
                results: {
                    ...state.results,
                    [problemId]: Object.keys(algos).map(uuid => ({
                        uuid,
                        ...algos[uuid],
                    })),
                },
                init: true,
                error: null,
                loading: false,
            };
        }
        case actionTypes.list.FAILURE: {
            return {
                ...state,
                loading: false,
                error: {
                    ...payload
                },
            };
        }
        default:
            return state;
        }
    };

