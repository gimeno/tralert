module.exports = {
    rootDir: process.cwd(),
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test'
    },
    restoreMocks: true,
    coveragePathIgnorePatterns: ['node_modules', 'index.js', 'express-app', 'logger', 'scrapper.util.js', 'fetchTrains.js'],
    coverageReporters: ['text', 'lcov', 'clover', 'html']
};
