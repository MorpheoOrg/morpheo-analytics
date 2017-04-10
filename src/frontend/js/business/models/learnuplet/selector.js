/**
 * Created by guillaume on 6/27/16.
 */

import {createSelector} from 'reselect';

const error = state => state.models.learnuplet.item.error;

export const getError = createSelector([error],
    error => error ? (JSON.parse(error.message).message ? JSON.parse(error.message).message : JSON.parse(error.message).non_field_errors) : error,
);
