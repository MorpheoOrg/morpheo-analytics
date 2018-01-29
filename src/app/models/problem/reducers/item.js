const initialState = {
    error: null,
    id: null,
    loading: false,
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
                loading: true,
            };
        case actionTypes.item.get.SUCCESS:
            return {
                ...state,
                id: payload.id,
                loading: false,
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                id: null,
            };
        case actionTypes.item.get.FAILURE:
        case actionTypes.item.create.FAILURE:
        case actionTypes.item.update.FAILURE:
        case actionTypes.item.delete.FAILURE:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
        }
    };

