const apiUrl = 'http://127.0.0.1:8080';
const apiSocketUrl = 'ws://127.0.0.1:8080';
const storageApiUrl = 'http://127.0.0.1:8000';
const orchestratorApiUrl = 'http://127.0.0.1:5000';

module.exports = {
    apps: {
        frontend: {
            api_url: apiUrl,
            api_socket_url: apiSocketUrl,
            storage_api_url: storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            baseName: {
                production: '/',
            },
        },
    },
};
