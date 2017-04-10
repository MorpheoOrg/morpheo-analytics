const initialState = {
    order: null,
};

export default actionTypes =>
    (state = initialState, action) => {
        switch (action.type) {
        case actionTypes.ordering.SET:
            return {
                ...state,
                order: action.payload.order,
            };
        default:
            return state;
        }
    };
