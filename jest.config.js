module.exports = {
    setupFiles: [
        '<rootDir>/test/shimSetup.js',
    ],
    setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
    snapshotSerializers: [
        'enzyme-to-json/serializer'
    ],
    collectCoverageFrom: [
        'src/app/**/*.js'
    ],
    transform: {
        '^.+\\.js?$': 'babel-jest'
    },
    globals: {
        NODE_API_URL: 'http://node_api_url',
        STORAGE_API_URL: 'http://storage_api_url',
    },
    // Add the test files into the coverage to be sure all test are passed
    forceCoverageMatch: [
        '**/*.spec.js'
    ],
};
