const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://bender-api.rythm.co';
const storageApiUrl = 'https://storage.morpheo.co';
const orchestratorApiUrl = 'https://orchestrator.morpheo.co';

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
    babel_ignore: /node_modules\/(?!admin-config)/,
};
