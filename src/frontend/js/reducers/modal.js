const initialState = {
    create: false,
    update: false,
    delete: false,
};

export default actionTypes =>
    (state = initialState, action) => {
        switch (action.type) {
        case actionTypes.modal.create.SET:
            return {
                ...state,
                create: action.payload,
            };
        case actionTypes.modal.update.SET:
            return {
                ...state,
                update: action.payload,
            };
        case actionTypes.modal.delete.SET:
            return {
                ...state,
                delete: action.payload,
            };
        default:
            return state;
        }
    };
