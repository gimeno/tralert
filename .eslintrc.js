module.exports = {
    env: {
        node: true,
        jest: true
    },
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:security/recommended',
        'plugin:jest/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: 'next'
            }
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'security/detect-object-injection': 'off',
        'import/no-extraneous-dependencies': 'off'
    }
};
