//const apiUrl = 'http://localhost:8001';
const apiUrl = 'https://bender-api.rythm.co';
//const storageApiUrl = 'http://localhost:8000';
const storageApiUrl = 'https://storage.morpheo.io';
//const orchestratorApiUrl = 'http://localhost:5000';
const orchestratorApiUrl = 'https://orchestrator.morpheo.io';

// uncomment this for testing with prod data
import {ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD, STORAGE_USER, STORAGE_PASSWORD} from  './devsecret';

module.exports = {
    apps: {
        frontend: {
            api_url: apiUrl,
            storage_api_url: storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            baseName: {
                production: '/',
            }
        },
    },
    credentials: {
        ORCHESTRATOR_USER,
        ORCHESTRATOR_PASSWORD,
        STORAGE_USER,
        STORAGE_PASSWORD,
    },
};
