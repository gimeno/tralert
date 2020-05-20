const mongoose = require('mongoose');

const setupTestDB = (mongooseConfig) => {
    beforeAll(async () => {
        await mongoose.connect(mongooseConfig.url, mongooseConfig.options);
    });

    beforeEach(async () => {
        await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};

module.exports = setupTestDB;
