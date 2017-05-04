const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://notebook.morpheo.co';
const apiSocketUrl = 'ws://notebook.morpheo.co';
const storageApiUrl = 'https://storage.morpheo.co';
const orchestratorApiUrl = 'https://orchestrator.morpheo.co';

module.exports = {
    appName: 'Notebook',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_socket_url: apiSocketUrl,
            api_port: apiPort,
            storage_api_url: storageApiUrl,
            orchestrator_api_url: orchestratorApiUrl,
            baseName: {
                production: '/',
                debug: '/morpheo-notebook/build/frontend/',
            },
        },
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
