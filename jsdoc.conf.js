module.exports = {
    plugins: [],
    recurseDepth: 10,
    source: {
        include: 'src/app/utils/testing',
        includePattern: '.+\\.js(doc|x)?$',
        excludePattern: '(^|\\/|\\\\)_',
    },
    sourceType: 'module',
    tags: {
        allowUnknownTags: true,
        dictionaries: ['jsdoc', 'closure'],
    },
    templates: {
        cleverLinks: false,
        monospaceLinks: false,
    },
    opts: {
        encoding: 'utf8',
        destination: './doc',
        recurse: true,
        template: 'node_modules/minami',
    },
};
