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

/* globals fetch */

import chai, {expect} from 'chai';
import {describe, it} from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {
    fetchEntitiesFactory,
    fetchEntityFactory,
    fetchEntitiesByPathFactory,
    fetchByUrl,
    deleteEntityFactory,
    updateEntityFactory,
    updateFormEntityFactory,
    createEntityFactory,
    createFormEntityFactory,
} from '../fetchEntities';

// const FormData = require('form-data');
const fs = require('fs');

chai.use(sinonChai);

global.API_URL = 'http://api';
global.fetch = sinon.stub();
global.fetch.returns(Promise.resolve());

describe('fetchEntitiesFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        fetchEntitiesFactory('foo')({});
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        fetchEntitiesFactory('foo')({}, 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with parameters and jwt', () => {
        fetchEntitiesFactory('foo')({page: 1}, 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntitiesFactory('foo')({}).then((result) => {
            expect(result.error.body.message).to.be.equal('Run you fools !');

            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchEntitiesFactory('foo')({}).then((result) => {
            expect(result).to.deep.equal({
                list: ['data'],
            });
            done();
        }).catch(done);
    });
});

describe('fetchEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        fetchEntityFactory('foo')({}, 'entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        fetchEntityFactory('foo')({}, 'entityId', 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntityFactory('foo')('entityId').then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => 'data',
        }));

        fetchEntityFactory('foo')('entityId').then((result) => {
            expect(result).to.deep.equal({
                item: 'data',
            });
            done();
        }).catch(done);
    });
});

describe('fetchEntitiesByPathFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({}, undefined, 1);
        expect(fetch).to.have.been.calledWith('http://api/foo/1/view/', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({}, 'token', 1);
        expect(fetch).to.have.been.calledWith('http://api/foo/1/view/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with parameters and jwt', () => {
        fetchEntitiesByPathFactory('foo', 'view')({page: 1}, 'token', 1);
        expect(fetch).to.have.been.calledWith('http://api/foo/1/view/?page=1', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchEntitiesByPathFactory('foo', 'view')({}).then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');

            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchEntitiesByPathFactory('foo', 'view')({}).then((result) => {
            expect(result).to.deep.equal({
                list: ['data'],
            });
            done();
        }).catch(done);
    });
});

describe('fetchByUrl', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        fetchByUrl('http://api/toto/');
        expect(fetch).to.have.been.calledWith('http://api/toto/', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        fetchByUrl('http://api/toto/', 'token');
        expect(fetch).to.have.been.calledWith('http://api/toto/', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with parameters and jwt', () => {
        fetchByUrl('http://api/toto/?page=1', 'token');
        expect(fetch).to.have.been.calledWith('http://api/toto/?page=1', {
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchByUrl('http://api/toto/').then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');

            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchByUrl('http://api/toto/').then((result) => {
            expect(result).to.deep.equal({
                list: ['data'],
            });
            done();
        }).catch(done);
    });
});

describe('deleteEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        deleteEntityFactory('foo')('entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        deleteEntityFactory('foo')('entityId', 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        deleteEntityFactory('foo')('entityId').then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            status: 204,
            json: () => 'data',
        }));

        deleteEntityFactory('foo')('entityId').then((result) => {
            expect(result).to.deep.equal(true);
            done();
        }).catch(done);
    });
});

describe('updateEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        updateEntityFactory('foo')('entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        updateEntityFactory('foo')('entityId', 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt with payload', () => {
        updateEntityFactory('foo')('entityId', 'token', {name: 'foo'});
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify({name: 'foo'}),
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        updateEntityFactory('foo')('entityId').then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => 'data',
        }));

        updateEntityFactory('foo')('entityId', 'token', {name: 'foo'}).then((result) => {
            expect(result).to.deep.equal({
                item: 'data',
            });
            done();
        }).catch(done);
    });
});


describe('createEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        createEntityFactory('foo')();
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        createEntityFactory('foo')('token');
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt and payload', () => {
        createEntityFactory('foo')('token', {name: 'foo'});
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'JWT token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            mode: 'cors',
            body: JSON.stringify({name: 'foo'}),
        });
    });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        createEntityFactory('foo')().then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            status: 201,
            json: () => 'data',
        }));

        createEntityFactory('foo')().then((result) => {
            expect(result).to.deep.equal({
                item: 'data',
            });
            done();
        }).catch(done);
    });
});


describe('createFormEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        createFormEntityFactory('foo')();
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            method: 'POST',
            headers: {},
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        createFormEntityFactory('foo')('token');
        expect(fetch).to.have.been.calledWith('http://api/foo/', {
            method: 'POST',
            headers: {
                Authorization: 'JWT token',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });


    // TODO: Find a way to test form with different boundary, can we mock in executed function?
    // it('should call fetch with correct parameters when called with jwt and payload', () => {
    //     const file = fs.createReadStream('foo.log');
    //     createFormEntityFactory('foo')('token', {name: 'foo', file: [file]});
    //     const body = new FormData();
    //     body.append('name', 'foo');
    //     body.append('file', file);
    //     console.log(body);
    //     expect(fetch).to.have.been.calledWith('http://api/foo/', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: 'JWT token',
    //         },
    //         mode: 'cors',
    //         body
    //     });
    // });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        createFormEntityFactory('foo')().then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            status: 201,
            json: () => 'data',
        }));

        const file = fs.createReadStream('foo.log');
        createFormEntityFactory('foo')('token', {name: 'foo', file: [file], tutu: undefined}).then((result) => {
            expect(result).to.deep.equal({
                item: 'data',
            });
            done();
        }).catch(done);
    });
});


describe('updateFormEntityFactory', () => {
    it('should call fetch with correct parameters when called without jwt', () => {
        updateFormEntityFactory('foo')('entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'PATCH',
            headers: {},
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        updateFormEntityFactory('foo')('entityId', 'token');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId/', {
            method: 'PATCH',
            headers: {
                Authorization: 'JWT token',
            },
            mode: 'cors',
            body: JSON.stringify(undefined),
        });
    });


    // TODO: Find a way to test form with different boundary, can we mock in executed function?
    // it('should call fetch with correct parameters when called with jwt and payload', () => {
    //     const file = fs.createReadStream('foo.log');
    //     updateFormEntityFactory('foo')('token', {name: 'foo', file: [file]});
    //     const body = new FormData();
    //     body.append('name', 'foo');
    //     body.append('file', file);
    //     console.log(body);
    //     expect(fetch).to.have.been.calledWith('http://api/foo/', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: 'JWT token',
    //         },
    //         mode: 'cors',
    //         body
    //     });
    // });

    it('should handle failed response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        updateFormEntityFactory('foo')().then((result) => {
            expect(result.error.body.message).to.deep.equal('Run you fools !');
            done();
        }).catch(done);
    });

    it('should handle successfull response', (done) => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => 'data',
        }));

        const file = fs.createReadStream('foo.log');
        updateFormEntityFactory('foo')('entityId', 'token', {
            name: 'foo',
            file: [file],
            tutu: undefined,
        }).then((result) => {
            expect(result).to.deep.equal({
                item: 'data',
            });
            done();
        }).catch(done);
    });
});
