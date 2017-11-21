const {
    NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD,
    ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
    STORAGE_USER, STORAGE_PASSWORD,
} = require('./devsecret');


const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://notebook-proxy.morpheo.co';
const apiSocketUrl = 'wss://notebook-proxy.morpheo.co';
const storageApiUrl = 'https://storage.morpheo.co';
const orchestratorApiUrl = 'https://orchestrator.morpheo.co';
const servicesApiUrl = 'https://notebook-services.morpheo.co';

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
                debug: '/morpheo-analytics/build/frontend/',
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
