/**
 * Created by guillaume on 6/14/16.
 */


import {expect} from 'chai';
import {describe, it} from 'mocha';
import createRequestActionTypes from '../createRequestActionTypes';

describe('createRequestActionTypes', () => {
    it('should return an object with REQUEST, SUCCESS and FAILURE properties', () => {
        const actionTypes = createRequestActionTypes('foo');

        expect(actionTypes).to.deep.equal({
            REQUEST: 'foo_REQUEST',
            SUCCESS: 'foo_SUCCESS',
            FAILURE: 'foo_FAILURE',
        });
    });
});
