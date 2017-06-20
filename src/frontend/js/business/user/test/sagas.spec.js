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
import {routerActions} from 'react-router-redux';
import {call, put, select} from 'redux-saga/effects';
import sinon from 'sinon';

import {
    signIn as signInSagaFactory,
    signOut as signOutSagaFactory,
} from '../sagas';
import {
    signIn as signInActions,
    signOut as signOutActions,
} from '../actions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI4NzUxZjkyNzJkM2Q0ODFmOGE3MWI3ZmIyYzAwMjdmNyIsImV4cCI6MTQ4NDE0MDE1MCwicGVybWlzc2lvbnMiOiJoZWFkYmFuZD1kcmVlbWVyO25vY3Rpcz1kcmVlbWVyO2RyZWVtZXI9ZHJlZW1lcjtjdXN0b21lcj1kcmVlbWVyO2RhdGFzZXQ9ZHJlZW1lcjtuaWdodHJlcG9ydD1kcmVlbWVyO2RhdGF1cGxvYWQ9ZHJlZW1lcjtkYXRhc2FtcGxlPWRyZWVtZXI7YWxnb3J5dGhtPWRyZWVtZXI7cHJvZHVjdF90ZXN0aW5nPWRyZWVtZXI7cXVhbGl0eT1kcmVlbWVyIn0.p7iIjHVvjY2CGKp4wMH21mmHzaYyAmpfjlGIudCZqio';

global.atob = str => new Buffer(str, 'base64').toString('ascii');

describe('userSagas', () => {
    describe('signIn', () => {
        const fetchSignIn = sinon.spy();
        const storeLocalUser = sinon.spy();
        const signInSaga = signInSagaFactory(fetchSignIn, storeLocalUser);

        it('should call the fetchSignIn function after a SIGN_IN action', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            expect(saga.next().value).to
                .deep.equal(call(fetchSignIn, 'test_email', 'test_password'));
        });

        it('should call the storeLocalUser function after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            expect(saga.next({
                res: {
                    user: {
                        token,
                    },
                    token,
                },
            }).value).to
                .deep.equal(call(storeLocalUser, {
                    email: undefined,
                    token,
                    user: {
                        exp: 1484140150,
                        username: undefined,
                        token,
                    },
                }));
        });

        it('should put the routerActions.push action after a succesfull signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));

            saga.next();

            saga.next({
                res: {
                    user: {
                        token,
                    },
                    token,
                },
            });

            expect(saga.next().value).to.deep.equal(
                put(signInActions.success({
                    exp: 1484140150,
                    username: undefined,
                    token,
                })),
            );
        });

        it('should put the signIn action with error after a failed signIn', () => {
            const saga = signInSaga(signInActions.request('/next-route', {
                email: 'test_email',
                password: 'test_password',
            }));
            const error = new Error('Run you fools!');

            saga.next();
            expect(saga.next({
                error,
            }).value).to.deep.equal(put(signInActions.failure(error)));
        });
    });

    describe('signOut', () => {
        const removeLocalUser = sinon.spy();
        const signOutSaga = signOutSagaFactory(removeLocalUser);

        it('should select', () => {
            const saga = signOutSaga(signOutActions.request());

            expect(saga.next().value).to.deep.equal(select());
        });

        it('should call the removeLocalUser function', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();

            expect(saga.next().value).to.deep.equal(call(removeLocalUser));
        });

        it('should put the signedOut action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();
            saga.next();

            expect(saga.next().value).to.deep.equal(put(signOutActions.success()));
        });

        it('should put the routerActions.push action', () => {
            const saga = signOutSaga(signOutActions.request());

            saga.next();
            saga.next({routing: {}});
            saga.next();

            expect(saga.next().value).to.deep.equal(put(routerActions.push({
                pathname: '/',
                state: {},
            })));
        });
    });
});
