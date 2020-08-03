/**
 * I have done this "re-export" of the react-scripts jest configuration so that
 * we are able to leverage Jest projects based execution from the root of the repo.
 */

const createJestConfig = require('react-scripts/scripts/utils/createJestConfig');

const rootDir = __dirname;
const resolveReactScriptsModule = (reactScriptsPath) => require.resolve(`react-scripts/${reactScriptsPath}`);
const isEjecting = false;

const config = createJestConfig(resolveReactScriptsModule, rootDir, isEjecting);

module.exports = {
    ...config,
    displayName: 'web',
    setupFilesAfterEnv: ['./src/setupTests.js'],
    coveragePathIgnorePatterns: ['/node_modules/', './src/assets', './src/utils', './src/i18n']
};
