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

/* globals API_URL localStorage, fetch */

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
            expect(fetch).to.have.been.calledWith(`${API_URL}/login/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    username: email,
                    password,
                }),
                mode: 'cors',
            });
        });

        it('should handle failed response', (done) => {
            global.fetch.returns(Promise.resolve({
                ok: false,
                text: () => Promise.resolve('Run you fools !'),
            }));

            fetchSignIn(email, password).then((result) => {
                expect(result.error.message).to.equal('Run you fools !');
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
                    res: 'data',
                });
                done();
            }).catch(done);
        });
    });

    describe('storeLocalUser', () => {
        it('should call fetch with correct parameters', () => {
            storeLocalUser({
                user: {
                    exp: '',
                    permission: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                },
                email: 'test_email',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjODYwNmRjMDIyOTU0MmIwODJiMzQ2YmYyMmFiMTBlYyIsImdyb3VwIjoiZHJlZW1lciIsInBlcm1pc3Npb25zIjoiaGVhZGJhbmQ9YWRtaW47bm9jdGlzPWFkbWluO2RyZWVtZXI9YWRtaW47Y3VzdG9tZXI9YWRtaW47ZGF0YXNldD1hZG1pbjtuaWdodHJlcG9ydD1hZG1pbjtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9YWRtaW47YWxnb3J5dGhtPWFkbWluIn0.UCadDW6dAv9R5XaKbKrXtmL31aCasV5SXubemNIejnM',
            });
            expect(localStorage.setItem).to.have.been.calledWith('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjODYwNmRjMDIyOTU0MmIwODJiMzQ2YmYyMmFiMTBlYyIsImdyb3VwIjoiZHJlZW1lciIsInBlcm1pc3Npb25zIjoiaGVhZGJhbmQ9YWRtaW47bm9jdGlzPWFkbWluO2RyZWVtZXI9YWRtaW47Y3VzdG9tZXI9YWRtaW47ZGF0YXNldD1hZG1pbjtuaWdodHJlcG9ydD1hZG1pbjtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9YWRtaW47YWxnb3J5dGhtPWFkbWluIn0.UCadDW6dAv9R5XaKbKrXtmL31aCasV5SXubemNIejnM');
            expect(localStorage.setItem).to.have.been.calledWith('exp', '');
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

