/**
 * Created by guillaume on 6/27/16.
 */

import {createSelector} from 'reselect';
import createDeepEqualSelector from '../../utils/selector';

const location = state => state.routing.location;
const error = state => state.user.error;

export const getPreviousRoute = createDeepEqualSelector([location],
    location => ({
        ...location,
        ...(location && location.state ? location.state : null), // override if necessary
    }),
);

export const getError = createSelector([error],
    error => error ? JSON.parse(error.message) : error,
);
