import {redirect} from 'redux-first-router';
import {clone} from 'lodash';

export default {
    onBeforeChange: (dispatch, getState, action) => {
        const {user} = getState();
        const a = clone(action);

        if (action.type !== 'HOME' && user && !user.authenticated && a) {
            const action = redirect({
                type: 'HOME',
                meta: {
                    ...a.meta,
                    location: {
                        ...a.meta.location,
                        current: {
                            pathname: '/',
                            type: 'HOME',
                            payload: {},
                        },
                        prev: a.meta.location.current,
                    },
                },
            });
            dispatch(action);
        }
    },
};
