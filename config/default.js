const {
    NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD,
    ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
    STORAGE_USER, STORAGE_PASSWORD,
} = require('./credentials');

const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://notebook-proxy.morpheo.io';
const apiSocketUrl = 'wss://notebook-proxy.morpheo.io';
const storageApiUrl = 'https://storage.morpheo.io';
const orchestratorApiUrl = 'https://orchestrator.morpheo.io';
const servicesApiUrl = 'https://notebook-services.morpheo.io';

module.exports = {
    appName: 'Analytics',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_socket_url: apiSocketUrl,
            api_port: apiPort,
            storage_api_url: storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            services_api_url: servicesApiUrl,
            baseName: {
                production: '/',
                debug: '/morpheo-notebook/build/frontend/',
            },
        },
    },
    credentials: {
        NOTEBOOK_SERVICES_USER,
        NOTEBOOK_SERVICES_PASSWORD,
        ORCHESTRATOR_USER,
        ORCHESTRATOR_PASSWORD,
        STORAGE_USER,
        STORAGE_PASSWORD,
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
