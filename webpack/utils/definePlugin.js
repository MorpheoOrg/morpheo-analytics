const webpack = require('webpack');
const config = require('config');

const PRODUCTION = (['production'].includes(process.env.NODE_ENV));

export default () => new webpack.DefinePlugin({
    'process.env.NODE_ENV': PRODUCTION ? JSON.stringify('production') : JSON.stringify('development'),
    'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false'),
    APP_NAME: JSON.stringify(config.appName),
    API_URL: JSON.stringify(config.apps.frontend.api_url),
    API_SOCKET_URL: JSON.stringify(config.apps.frontend.api_socket_url),
    PRODUCTION_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.production),
    DEBUG_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.debug),
    STORAGE_API_URL: JSON.stringify(config.apps.frontend.storage_api_url),
    ORCHESTRATOR_API_URL: JSON.stringify(config.apps.frontend.orchestrator_api_url),
    SERVICES_API_URL: JSON.stringify(config.apps.frontend.services_api_url),
    NOTEBOOK_SERVICES_USER: JSON.stringify(config.credentials.NOTEBOOK_SERVICES_USER),
    NOTEBOOK_SERVICES_PASSWORD: JSON.stringify(config.credentials.NOTEBOOK_SERVICES_PASSWORD),
    ORCHESTRATOR_USER: JSON.stringify(config.credentials.ORCHESTRATOR_USER),
    ORCHESTRATOR_PASSWORD: JSON.stringify(config.credentials.ORCHESTRATOR_PASSWORD),
    STORAGE_USER: JSON.stringify(config.credentials.STORAGE_USER),
    STORAGE_PASSWORD: JSON.stringify(config.credentials.STORAGE_PASSWORD),
});
