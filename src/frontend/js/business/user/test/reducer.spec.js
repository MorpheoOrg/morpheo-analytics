/**
 * Created by guillaume on 6/14/16.
 */


import {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import reducerFactory from '../reducer';
import {signIn, signOut} from '../actions';

describe('user reducer', () => {
    const getItemWithUser = sinon.stub();
    const expireTokenTime = Math.floor(Date.now() / 1000) + 7200;
    getItemWithUser.withArgs('id').returns('foo');
    getItemWithUser.withArgs('email').returns('foo@bar.com');
    getItemWithUser.withArgs('token').returns('bar');
    getItemWithUser.withArgs('permission').returns('dreemer');
    getItemWithUser.withArgs('exp').returns(expireTokenTime);

    const localStorageWithUser = {
        getItem: getItemWithUser,
    };

    it('should return the user saved in localStorage as its initial state', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, {type: 'foo'})).to.deep.equal({
            authenticated: true,
            has_permission: false,
            loading: false,
            permission: 'dreemer',
            token: 'bar',
            exp: expireTokenTime,
            email: 'foo@bar.com',
        });
    });

    it('should handle the signIn.request action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signIn.request())).to.deep.equal({
            authenticated: false,
            has_permission: false,
            error: false,
            loading: true,
            token: null,
            exp: null,
            email: undefined,
            permission: null,
        });
    });

    it('should handle the signIn.success action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);

        expect(reducer(undefined, signIn.success({
            token: 'bar',
            exp: expireTokenTime,
        }))).to.deep.equal({
            authenticated: true,
            has_permission: false,
            error: false,
            loading: false,
            token: 'bar',
            exp: expireTokenTime,
            email: undefined,
            permission: undefined,
        });
    });

    it('should handle the signIn.failure action', () => {
        const getItem = sinon.stub().returns(undefined);
        const localStorage = {
            getItem,
        };
        const reducer = reducerFactory(localStorage);
        const error = new Error('Run you fools!');
        expect(reducer(undefined, signIn.failure(error))).to.deep.equal({
            token: null,
            exp: null,
            authenticated: false,
            has_permission: false,
            loading: false,
            error,
            email: '',
            permission: null,
        });
    });

    it('should handle the signOut.success action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signOut.success())).to.deep.equal({
            authenticated: false,
            has_permission: false,
            loading: false,
            token: null,
            exp: null,
            email: '',
            permission: null,
        });
    });
});
