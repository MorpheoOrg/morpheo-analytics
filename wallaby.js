module.exports = wallaby => ({
    files: [
        'src/**/*.js',
        'package.json',
        '!src/**/tests/*.spec.js',
    ],

    tests: [
        'src/**/tests/*.spec.js'
    ],

    env: {
        type: 'node',
        runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
        '**/*.js': wallaby.compilers.babel()
    },

    // filesWithNoCoverageCalculated: [
    //     'src/**/tests/*.spec.js',
    // ],
});
