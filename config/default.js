import {ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD, STORAGE_USER, STORAGE_PASSWORD} from  './credentials';

const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://bender-api.rythm.co';
const storageApiUrl = 'https://storage.morpheo.io';
const orchestratorApiUrl = 'https://orchestrator.morpheo.io';

module.exports = {
    appName: 'Analytics',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_port: apiPort,
            storage_api_url : storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            baseName: {
                production: '/',
                debug: '/morpheo-analytics/build/frontend/',
            }
        },
    },
    credentials: {
        ORCHESTRATOR_USER,
        ORCHESTRATOR_PASSWORD,
        STORAGE_USER,
        STORAGE_PASSWORD,
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
