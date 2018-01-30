import {createAction} from 'redux-actions';


const prefix = 'SIDE_BAR::';

export const actionTypes = {
    resize: `${prefix}RESIZE`,
    setIndex: `${prefix}SET_INDEX`,
    setStatus: `${prefix}SET_STATUS`,
};

export default {
    resize: createAction(actionTypes.resize),
    setIndex: createAction(actionTypes.setIndex),
    setStatus: createAction(actionTypes.setStatus),
};
