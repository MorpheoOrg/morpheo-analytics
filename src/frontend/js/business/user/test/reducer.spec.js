/**
 * Copyright Morpheo Org. 2017
 *
 * contact@morpheo.co
 *
 * This software is part of the Morpheo project, an open-source machine
 * learning platform.
 *
 * This software is governed by the CeCILL license, compatible with the
 * GNU GPL, under French law and abiding by the rules of distribution of
 * free software. You can  use, modify and/ or redistribute the software
 * under the terms of the CeCILL license as circulated by CEA, CNRS and
 * INRIA at the following URL "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
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
            firstName: undefined,
            has_permission: false,
            lastName: undefined,
            modal: false,
            registered: false,
            loading: false,
            permission: 'dreemer',
            token: 'bar',
            exp: expireTokenTime,
            email: 'foo@bar.com',
            username: undefined,
        });
    });

    it('should handle the signIn.request action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signIn.request())).to.deep.equal({
            authenticated: false,
            firstName: undefined,
            has_permission: false,
            lastName: undefined,
            modal: false,
            registered: false,
            error: false,
            loading: true,
            token: null,
            exp: null,
            email: undefined,
            permission: null,
            username: undefined,
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
            firstName: undefined,
            has_permission: false,
            lastName: undefined,
            modal: false,
            registered: true,
            error: false,
            loading: false,
            token: 'bar',
            exp: expireTokenTime,
            email: undefined,
            permission: undefined,
            username: undefined,
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
            firstName: undefined,
            has_permission: false,
            lastName: undefined,
            modal: false,
            registered: false,
            loading: false,
            error,
            email: '',
            permission: null,
            username: undefined,
        });
    });

    it('should handle the signOut.success action', () => {
        const reducer = reducerFactory(localStorageWithUser);

        expect(reducer(undefined, signOut.success())).to.deep.equal({
            authenticated: false,
            firstName: undefined,
            has_permission: false,
            lastName: undefined,
            modal: false,
            registered: false,
            loading: false,
            token: null,
            exp: null,
            email: '',
            permission: null,
            username: undefined,
        });
    });
});
