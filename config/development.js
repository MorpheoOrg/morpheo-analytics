const apiUrl = 'http://localhost:8001';
const storageApiUrl = 'http://localhost:8000';
const orchestratorApiUrl = 'http://localhost:5000';

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
};
