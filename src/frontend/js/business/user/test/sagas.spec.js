/**
 * Created by guillaume on 6/14/16.
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

            expect(saga.next({user: {id: 'foo', token}}).value).to
                .deep.equal(call(storeLocalUser, {
                    email: 'test_email',
                    user: {
                        exp: 1484140150,
                        has_permission: true,
                        id: 'foo',
                        permission: 'admin',
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
                user: {
                    exp: 1484140150,
                    has_permission: false,
                    id: 'foo',
                    permission: 'dreemer',
                    token,
                },
            });

            expect(saga.next().value).to.deep.equal(
                put(signInActions.success({
                    exp: 1484140150,
                    has_permission: true,
                    id: 'foo',
                    permission: 'admin',
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
