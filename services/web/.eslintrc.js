module.exports = {
    extends: ['../../.eslintrc', 'react-app'],
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'no-console': ["warn", { allow: ["warn", "error"] }],
        'security/detect-non-literal-fs-filename': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off'
    }
};
