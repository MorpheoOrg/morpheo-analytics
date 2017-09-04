const servicesApiUrl = 'http://127.0.0.1:8000';

module.exports = {
    apps: {
        frontend: {
            services_api_url: servicesApiUrl,
            baseName: {
                production: '/',  // uncomment when production ready with new domain
                //production: '/notebook/',
            },
        },
    },
};
