import {createAction} from 'redux-actions';


export const actionTypes = {
    show: 'LEFT_PANEL::SHOW',
    hide: 'LEFT_PANEL::HIDE',
    resize: 'LEFT_PANEL::RESIZE',
    toogleVisibility: 'LEFT_PANEL::TOOGLE_VISIBILITY',
};

export default {
    show: createAction(actionTypes.show),
    hide: createAction(actionTypes.hide),
    resize: createAction(actionTypes.resize),
    toogleVisibility: createAction(actionTypes.toogleVisibility),
};
