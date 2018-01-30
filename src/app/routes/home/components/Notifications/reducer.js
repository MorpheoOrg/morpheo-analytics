import {actionsTypes} from './actions';


const initialState = {
    opened: false,
    content: 'Algorithm successfuly sent',
    type: 'ERROR',
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
    case actionsTypes.close:
        return ({
            ...state,
            opened: false,
        });
    case actionsTypes.send: {
        const {content, type} = payload;
        return ({
            opened: true,
            content,
            type,
        });
    }
    default:
        return state;
    }
};
