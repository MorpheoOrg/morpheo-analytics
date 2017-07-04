// const apiUrl = 'http://127.0.0.1:8080';
// const apiSocketUrl = 'ws://127.0.0.1:8080';
// const storageApiUrl = 'http://127.0.0.1:8001';
// const orchestratorApiUrl = 'http://127.0.0.1:5000';
// const servicesApiUrl = 'http://127.0.0.1:8000';

// uncomment this for testing with prod data
import {NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD} from './devsecret';

const apiUrl = 'http://notebook-proxy.morpheo.io';
const apiSocketUrl = 'ws://notebook-proxy.morpheo.io';
const storageApiUrl = 'https://storage.morpheo.io';
const orchestratorApiUrl = 'https://orchestrator.morpheo.io';
const servicesApiUrl = 'https://notebook-services.morpheo.io';

module.exports = {
    apps: {
        frontend: {
            api_url: apiUrl,
            api_socket_url: apiSocketUrl,
            storage_api_url: storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            services_api_url: servicesApiUrl,
            baseName: {
                production: '/',
            },
        },
    },
    credentials: {
        NOTEBOOK_SERVICES_USER,
        NOTEBOOK_SERVICES_PASSWORD,
    },
};
