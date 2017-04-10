const initialState = {
    selectedMetric: null,
    selectedParameter: null,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
            case actionTypes.chart.selectedMetric.SET:
                return {
                    ...state,
                    selectedMetric: payload,
                };
            case actionTypes.chart.selectedParameter.SET:
                return {
                    ...state,
                    selectedParameter: payload,
                };
            default:
                return state;
        }
    };

