module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "indent": [2, 4],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/jsx-filename-extension": [0],
        "react/no-danger": [0],
        "import/no-extraneous-dependencies": [2, {"devDependencies": true}],
        "camelcase": [0],
        "one-var": [0],
        "no-nested-ternary": [0],
        "brace-style": [2, 'stroustrup'],
        "no-confusing-arrow": [0],
        "object-property-newline": [2, {"allowMultiplePropertiesPerLine": true}],
        "no-shadow": [0],
        "global-require": [0],
        "no-console": [0, {"allow": ["warn", "error"]}],
        "no-restricted-syntax": [0],
        "import/no-webpack-loader-syntax": [0],
        "import/no-unresolved": [0],
        "arrow-parens": [2],
        "max-len": [0],
        "no-unused-vars": [2, {"args": "none"}],
        "consistent-return": [0],
        "no-bitwise": [0],
        "jsx-a11y/label-has-for": [0],
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
        "function-paren-newline": ["error", "consistent"],
        "comma-dangle": ["error", {
            "arrays": "only-multiline",
            "objects": "only-multiline",
            "imports": "only-multiline",
            "exports": "only-multiline",
            "functions": "ignore"
        }],

        // helper for fixing common lint errors
        "func-names": [2],
        "import/first": [2],
        "import/newline-after-import": ["error", { "count": 2 }],
        "import/no-mutable-exports": [2],
        "import/prefer-default-export": [2],
        "react/forbid-prop-types": [2],
        "react/jsx-closing-bracket-location": [2],
        "react/jsx-no-bind": [2],
        "react/no-string-refs": [2],
        "react/no-unused-prop-types": [2],
        "react/prefer-es6-class": [2],
        "react/prefer-stateless-function": [2],
        "react/prop-types": [2],
        "jsx-a11y/no-static-element-interactions": [0],
        "no-param-reassign": [2],
        "no-undef": [2],

        // babel
        "object-curly-spacing": [0],
        "object-curly-newline": [0],
        "babel/object-curly-spacing": [2, 'never'],
    },
    "plugins": [
        "babel",
        "react",
        "jsx-a11y",
        "import",
    ],
    overrides: [
        {
            files: [
                "**/*spec.js",
                "test/**/*.js",
                "src/client/js/utils/testing/**/*.js",
            ],
            env: { "jest": true }
        }
    ]
};
