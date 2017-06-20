import config from 'config';
import webpack from 'webpack';

const PRODUCTION = process.env.NODE_ENV === 'production';
const DEVELOPMENT = process.env.NODE_ENV === 'development';

export function definePlugin() {
    return new webpack.DefinePlugin({
        'process.env.NODE_ENV': PRODUCTION ? JSON.stringify("production") : JSON.stringify("development"),
        APP_NAME: JSON.stringify(config.appName),
        API_URL: JSON.stringify(config.apps.frontend.api_url),
        PRODUCTION_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.production),
        DEBUG_BASE_NAME: JSON.stringify(config.apps.frontend.baseName.debug),

        STORAGE_API_URL: JSON.stringify(config.apps.frontend.storage_api_url),
        STORAGE_USER: JSON.stringify(config.credentials.STORAGE_USER),
        STORAGE_PASSWORD: JSON.stringify(config.credentials.STORAGE_PASSWORD),

        ORCHESTRATOR_API_URL: JSON.stringify(config.apps.frontend.orchestrator_api_url),
        ORCHESTRATOR_USER: JSON.stringify(config.credentials.ORCHESTRATOR_USER),
        ORCHESTRATOR_PASSWORD: JSON.stringify(config.credentials.ORCHESTRATOR_PASSWORD),
    });
}
