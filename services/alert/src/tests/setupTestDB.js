const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/alerts-test';

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const setupTestDB = () => {
    beforeAll(async () => {
        await mongoose.connect(`${MONGODB_URI}`, options);
    });

    beforeEach(async () => {
        await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};

module.exports = setupTestDB;
