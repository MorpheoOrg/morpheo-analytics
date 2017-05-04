const apiUrl = 'http://localhost:8080';
const apiSocketUrl = 'ws://localhost:8080';
const storageApiUrl = 'http://localhost:8000';
const orchestratorApiUrl = 'http://localhost:5000';

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
