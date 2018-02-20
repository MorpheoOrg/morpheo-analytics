const apiPort = process.env.NODE_PORT || 3000;
const apiUrl = 'https://notebook-proxy.morpheo.co';
const apiSocketUrl = 'wss://notebook-proxy.morpheo.co';
const storageApiUrl = 'https://storage.morpheo.co';
const nodeProxyUrl = 'http://localhost:4000';
const servicesApiUrl = 'https://notebook-services.morpheo.co';

module.exports = {
    appName: 'Analytics',
    apps: {
        frontend: {
            api_url: apiUrl,
            api_socket_url: apiSocketUrl,
            api_port: apiPort,
            storage_api_url: storageApiUrl,
            node_proxy_url: nodeProxyUrl,
            services_api_url: servicesApiUrl,
            baseName: {
                production: '/',
                debug: '/morpheo-analytics/build/frontend/',
            },
        },
    },
    babel_ignore: /node_modules\/(?!admin-config)/,
};
