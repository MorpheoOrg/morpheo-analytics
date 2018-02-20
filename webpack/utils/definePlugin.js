const webpack = require('webpack');
const config = require('config');


const PRODUCTION = (['production'].includes(process.env.NODE_ENV));

export default () => new webpack.DefinePlugin({
    'process.env.NODE_ENV': PRODUCTION ? JSON.stringify('production') : JSON.stringify('development'),
    'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false'),
    'process.env.IS_ELECTRON': JSON.stringify(process.env.IS_ELECTRON || 'false'),
    APP_NAME: JSON.stringify(config.appName),
    API_URL: JSON.stringify(config.apps.frontend.api_url),
    API_SOCKET_URL: JSON.stringify(config.apps.frontend.api_socket_url),
    PRODUCTION_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.production),
    DEBUG_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.debug),
    STORAGE_API_URL: JSON.stringify(config.apps.frontend.storage_api_url),
    NODE_PROXY_URL: JSON.stringify(config.apps.frontend.node_proxy_url),
    SERVICES_API_URL: JSON.stringify(config.apps.frontend.services_api_url),
});
