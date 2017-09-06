// uncomment this for testing with prod data
import {NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD} from './devsecret';

// const apiUrl = 'http://127.0.0.1:8080';
// const apiSocketUrl = 'ws://127.0.0.1:8080';
// const storageApiUrl = 'http://127.0.0.1:8001';
// const orchestratorApiUrl = 'http://127.0.0.1:5000';
const servicesApiUrl = 'http://127.0.0.1:8000';

module.exports = {
    apps: {
        frontend: {
            services_api_url: servicesApiUrl,
        },
    },
    credentials: {
        NOTEBOOK_SERVICES_USER,
        NOTEBOOK_SERVICES_PASSWORD,
    },
};
