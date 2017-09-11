import path from 'path';
import {redirect} from 'redux-first-router';
import {endsWith} from 'lodash';

export default {
    onBeforeChange: (dispatch, getState, action) => {
        const {user, location} = getState();

        // for handling electron
        if (action.type !== 'HOME' &&
            (endsWith(location.pathname, path.join(__dirname, '../electron/app.html')) ||
             endsWith(location.prev.pathname, path.join(__dirname, '../electron/app.html')))
        ) {
            dispatch(redirect({type: 'HOME'}));
        }
        else if (action.type !== 'HOME' && user && !user.authenticated) {
            dispatch(redirect({type: 'HOME'}));
        }
    },
};
