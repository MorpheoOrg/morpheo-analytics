// uncomment this for testing with prod data
import {
    NOTEBOOK_SERVICES_USER, NOTEBOOK_SERVICES_PASSWORD,
    ORCHESTRATOR_USER, ORCHESTRATOR_PASSWORD,
    STORAGE_USER, STORAGE_PASSWORD,
} from './devsecret';


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
        ORCHESTRATOR_USER,
        ORCHESTRATOR_PASSWORD,
        STORAGE_USER,
        STORAGE_PASSWORD,
    },
};
