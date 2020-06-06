// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
const connect = async (mongooseConfig) => {
    const uri = await mongod.getConnectionString();

    await mongoose.connect(uri, mongooseConfig.options);
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
const clearDatabase = async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
};

const setupTestDB = (mongooseConfig) => {
    beforeAll(async () => {
        await connect(mongooseConfig);
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await closeDatabase();
    });
};

module.exports = setupTestDB;
