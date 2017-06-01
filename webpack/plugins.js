import config from 'config';
import webpack from 'webpack';

const PRODUCTION = process.env.NODE_ENV === 'production';

export function definePlugin() {
    return new webpack.DefinePlugin({
        'process.env.NODE_ENV': PRODUCTION ? JSON.stringify("production") : JSON.stringify("development"),
        APP_NAME: JSON.stringify(config.appName),
        API_URL: JSON.stringify(config.apps.frontend.api_url),
        API_SOCKET_URL: JSON.stringify(config.apps.frontend.api_socket_url),
        PRODUCTION_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.production),
        DEBUG_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.debug),
        STORAGE_API_URL: JSON.stringify(config.apps.frontend.storage_api_url),
        ORCHESTRATOR_API_URL: JSON.stringify(config.apps.frontend.orchestrator_api_url),
        SERVICES_API_URL: JSON.stringify(config.apps.frontend.services_api_url),
    });
}
