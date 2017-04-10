/**
 * Created by guillaume on 6/16/16.
 */

/* globals LOGIN_URL, localStorage, btoa, fetch */

import chai, {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
    fetchSignIn,
    storeLocalUser,
    removeLocalUser,
} from '../api';

chai.use(sinonChai);

global.API_URL = 'http://api';
global.LOGIN_URL = 'http://login';
global.fetch = sinon.stub();
global.localStorage = sinon.stub();
global.localStorage.setItem = sinon.stub();
global.localStorage.removeItem = sinon.stub();
global.fetch.returns(Promise.resolve());
global.btoa = str => new Buffer(str).toString('base64');

describe('user api', () => {
    describe('fetchSignIn', () => {
        const email = 'foo',
            password = 'bar';

        it('should call fetch with correct parameters', () => {
            fetchSignIn(email, password);
            expect(fetch).to.have.been.calledWith(`${LOGIN_URL}/token/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                },
                mode: 'cors',
            });
        });

        it('should handle failed response', (done) => {
            global.fetch.returns(Promise.resolve({
                ok: false,
                text: () => Promise.resolve('Run you fools !'),
            }));

            fetchSignIn(email, password).then((result) => {
                expect(result).to.deep.equal({
                    error: new Error('Run you fools !'),
                });
                done();
            }).catch(done);
        });

        it('should handle successfull response', (done) => {
            global.fetch.returns(Promise.resolve({
                ok: true,
                json: () => 'data',
            }));

            fetchSignIn(email, password).then((result) => {
                expect(result).to.deep.equal({
                    user: 'data',
                });
                done();
            }).catch(done);
        });
    });

    describe('storeLocalUser', () => {
        it('should call fetch with correct parameters', () => {
            storeLocalUser({
                user: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjODYwNmRjMDIyOTU0MmIwODJiMzQ2YmYyMmFiMTBlYyIsImdyb3VwIjoiZHJlZW1lciIsInBlcm1pc3Npb25zIjoiaGVhZGJhbmQ9YWRtaW47bm9jdGlzPWFkbWluO2RyZWVtZXI9YWRtaW47Y3VzdG9tZXI9YWRtaW47ZGF0YXNldD1hZG1pbjtuaWdodHJlcG9ydD1hZG1pbjtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9YWRtaW47YWxnb3J5dGhtPWFkbWluIn0.UCadDW6dAv9R5XaKbKrXtmL31aCasV5SXubemNIejnM',
                    user_id: '6155c775-8b05-4890-99d2-ecd0d90ddb72',
                },
                email: 'test_email',
            });
            expect(localStorage.setItem).to.have.been.calledWith('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjODYwNmRjMDIyOTU0MmIwODJiMzQ2YmYyMmFiMTBlYyIsImdyb3VwIjoiZHJlZW1lciIsInBlcm1pc3Npb25zIjoiaGVhZGJhbmQ9YWRtaW47bm9jdGlzPWFkbWluO2RyZWVtZXI9YWRtaW47Y3VzdG9tZXI9YWRtaW47ZGF0YXNldD1hZG1pbjtuaWdodHJlcG9ydD1hZG1pbjtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9YWRtaW47YWxnb3J5dGhtPWFkbWluIn0.UCadDW6dAv9R5XaKbKrXtmL31aCasV5SXubemNIejnM');
            expect(localStorage.setItem).to.have.been.calledWith('exp', undefined);
        });
    });

    describe('removeLocalUser', () => {
        it('should call fetch with correct parameters', () => {
            removeLocalUser();
            expect(localStorage.removeItem).to.have.been.calledWith('token');
            expect(localStorage.removeItem).to.have.been.calledWith('exp');
        });
    });
});

