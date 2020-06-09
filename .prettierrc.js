module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 120,
    endOfLine: 'lf',
    overrides: [
        {
            files: ['*.json'],
            options: {
                tabWidth: 2
            }
        }
    ]
};
