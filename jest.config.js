module.exports = {
    testEnvironmentOptions: {
        NODE_ENV: 'test',
        BABEL_ENV: 'test'
    },
    coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],
    projects: ['<rootDir>/packages/*/jest.config.js', '<rootDir>/services/*/jest.config.js']
};
