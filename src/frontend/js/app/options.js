import {redirect} from 'redux-first-router';

export default {
    onBeforeChange: (dispatch, getState, action) => {
        const {user, location} = getState();

        if (action.type !== 'HOME' && user && !user.authenticated) {
            dispatch(redirect({type: 'HOME'}));
        }
    },
};
