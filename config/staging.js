const apiUrl = 'https://api-staging.rythm.co/v1/dreem/bender';
const loginUrl = 'https://login-staging.rythm.co';

module.exports = {
    appName: 'Analytics Staging',
    apps: {
        frontend: {
            api_url: apiUrl,
            login_url: loginUrl,
        },
    },
};
