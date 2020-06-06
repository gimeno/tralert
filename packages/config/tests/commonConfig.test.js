process.env.NODE_ENV = '';
const commonConfig = require('../commonConfig');

describe('commonConfig', () => {
    test('should set env to production if there is no NODE_ENV value', async () => {
        const { env } = commonConfig;
        expect(env).toBe('production');
    });
});
