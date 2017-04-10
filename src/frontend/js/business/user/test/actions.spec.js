/**
 * Created by guillaume on 6/14/16.
 */

import {expect} from 'chai';
import {describe, it} from 'mocha';
import {signIn, signOut, actionTypes} from '../actions';

describe('userActions', () => {
    it('signIn.request should return the correct action', () => {
        expect(signIn.request('/route', {
            email: 'test_email',
            password: 'test_password',
        })).to.deep.equal({
            type: actionTypes.signIn.REQUEST,
            payload: {
                previousRoute: '/route',
                email: 'test_email',
                password: 'test_password',
            },
        });
    });

    it('signIn.success should return the correct action', () => {
        expect(signIn.success({
            id: 'id_test',
            email: 'test_email',
            token: 'test_token',
        })).to.deep.equal({
            type: actionTypes.signIn.SUCCESS,
            payload: {id: 'id_test', email: 'test_email', token: 'test_token'},
        });
    });

    it('signIn.failure should return the correct action', () => {
        const error = new Error('Run you fools !');

        expect(signIn.failure(error)).to.deep.equal({
            type: actionTypes.signIn.FAILURE,
            payload: error,
            error: true,
        });
    });

    it('signOut.request should return the correct action', () => {
        expect(signOut.request()).to.deep.equal({
            type: actionTypes.signOut.REQUEST,
        });
    });

    it('signOut.success should return the correct action', () => {
        expect(signOut.success()).to.deep.equal({
            type: actionTypes.signOut.SUCCESS,
        });
    });
});
