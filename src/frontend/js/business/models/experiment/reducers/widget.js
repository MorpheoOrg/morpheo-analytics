const initialState = {
    scatter: {
        x: 0,
        y: 0,
    },
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.widget.scatter.x.SET:
            return {
                ...state,
                scatter: {
                    ...state.scatter,
                    x: payload,
                },
            };
        case actionTypes.widget.scatter.y.SET:
            return {
                ...state,
                scatter: {
                    ...state.scatter,
                    y: payload,
                },
            };
        default:
            return state;
        }
    };

