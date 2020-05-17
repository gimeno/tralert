/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const httpStatus = require('http-status');
const moment = require('moment');
const app = require('../app');
const setupTestDB = require('./setupTestDB');
const { Alert } = require('../models');
const {
    nonFoundPreviousTrainAlert,
    foundPreviousTrainAlert,
    alertFromRandomUser,
    insertAlerts
} = require('./fixtures/alert.fixture');

const FORMAT_DATE = 'DD-MM-YYYY';

setupTestDB();

describe('Alert routes', () => {
    describe('POST /alerts', () => {
        let newAlert;

        beforeEach(() => {
            newAlert = {
                origin: 'newOrigin',
                destination: 'newDestination',
                departDate: moment().add(1, 'd').format(FORMAT_DATE),
                returnDate: moment().add(2, 'd').format(FORMAT_DATE),
                price: 100,
                userId: 'auth0|NewABC1234'
            };
        });

        test('should return 201 and successfully create new alert if data is ok', async () => {
            const res = await request(app).post('/alerts').send(newAlert);

            expect(res.status).toBe(httpStatus.CREATED);
            expect(res.body).toEqual({
                id: expect.anything(),
                destination: newAlert.destination,
                origin: newAlert.origin,
                departDate: newAlert.departDate,
                returnDate: newAlert.returnDate,
                price: newAlert.price
            });

            const dbAlert = await Alert.findById(res.body.id);
            expect(dbAlert).toBeDefined();
            expect(dbAlert.transform()).toMatchObject({
                id: expect.anything(),
                destination: newAlert.destination,
                origin: newAlert.origin,
                departDate: newAlert.departDate,
                returnDate: newAlert.returnDate,
                price: newAlert.price
            });
        });

        test('should return 400 error if userId is missing', async () => {
            delete newAlert.userId;

            const res = await request(app).post('/alerts').send(newAlert);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toEqual({
                message: '"userId" is required'
            });
        });

        test('should return 400 error if userId is not auth0 id', async () => {
            newAlert.userId = 'fakeid';

            const res = await request(app).post('/alerts').send(newAlert);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body).toEqual({
                message: '"userId" must be a valid auth0 id'
            });
        });
    });

    describe('GET /alerts', () => {
        test("should return 200 and all users' alerts", async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query();
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(3);
            expect(res.body[0]).toHaveProperty('id', nonFoundPreviousTrainAlert._id.toHexString());
        });

        test('should correctly apply filter on userId field', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query({ userId: alertFromRandomUser.userId });
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].id).toBe(alertFromRandomUser._id.toHexString());
        });

        test('should correctly sort returned array if descending sort param is specified', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query({ sortBy: 'departDate:desc' });
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(3);
            expect(res.body[0].id).toBe(alertFromRandomUser._id.toHexString());
        });

        test('should correctly sort returned array if ascending sort param is specified', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query({ sortBy: 'departDate:asc' });
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(3);
            expect(res.body[0].id).toBe(nonFoundPreviousTrainAlert._id.toHexString());
        });

        test('should limit returned array if limit param is specified', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query({ limit: 2 });
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].id).toBe(nonFoundPreviousTrainAlert._id.toHexString());
        });

        test('should return the correct page if page and limit params are specified', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert, foundPreviousTrainAlert, alertFromRandomUser]);

            const res = await request(app).get('/alerts').query({ page: 2, limit: 2 });
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].id).toBe(alertFromRandomUser._id.toHexString());
        });
    });

    describe('GET /alerts/:alertId', () => {
        test('should return 200 and the alert data if the data is ok', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            const res = await request(app).get(`/alerts/${nonFoundPreviousTrainAlert._id}`).send();
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual({
                id: nonFoundPreviousTrainAlert._id.toHexString(),
                origin: nonFoundPreviousTrainAlert.origin,
                destination: nonFoundPreviousTrainAlert.destination,
                departDate: moment(nonFoundPreviousTrainAlert.departDate).format(FORMAT_DATE),
                returnDate: moment(nonFoundPreviousTrainAlert.returnDate).format(FORMAT_DATE),
                price: nonFoundPreviousTrainAlert.price
            });
        });

        test('should return 400 error if alertId is not a valid mongo id', async () => {
            const res = await request(app).get('/alerts/invalidId').send();
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

        test('should return 404 error if alert is not found', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            const res = await request(app).get(`/alerts/${foundPreviousTrainAlert._id}`).send();
            expect(res.status).toBe(httpStatus.NOT_FOUND);
        });
    });

    describe('PATCH /alerts/:alertId', () => {
        test('should return 200 and successfully update alert if data is ok', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);
            const updateBody = {
                departDate: moment().add(10, 'd').format(FORMAT_DATE),
                returnDate: moment().add(11, 'd').format(FORMAT_DATE),
                price: 100
            };

            const res = await request(app).patch(`/alerts/${nonFoundPreviousTrainAlert._id}`).send(updateBody);
            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).not.toHaveProperty('password');
            expect(res.body).toEqual({
                id: nonFoundPreviousTrainAlert._id.toHexString(),
                origin: nonFoundPreviousTrainAlert.origin,
                destination: nonFoundPreviousTrainAlert.destination,
                departDate: updateBody.departDate,
                returnDate: updateBody.returnDate,
                price: updateBody.price
            });

            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            expect(dbAlert).toBeDefined();
            expect(dbAlert.transform()).toMatchObject({
                id: nonFoundPreviousTrainAlert._id.toHexString(),
                destination: nonFoundPreviousTrainAlert.destination,
                origin: nonFoundPreviousTrainAlert.origin,
                departDate: updateBody.departDate,
                returnDate: updateBody.returnDate,
                price: updateBody.price
            });
        });

        test('should return 400 error if alertId is not a valid mongo id', async () => {
            const res = await request(app).patch('/alerts/invalidId').send();
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

        test('should return 400 error if departureDate is not a valid', async () => {
            const updateBody = { departDate: moment().add(-10, 'd').format(FORMAT_DATE) };
            const res = await request(app).patch(`/alerts/${foundPreviousTrainAlert._id}`).send(updateBody);
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

        test('should return 404 if alert is not found', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);
            const updateBody = { price: 100 };

            const res = await request(app).patch(`/alerts/${foundPreviousTrainAlert._id}`).send(updateBody);
            expect(res.status).toBe(httpStatus.NOT_FOUND);
        });
    });

    describe('DELETE /alerts/:alertId', () => {
        test('should return 204 if data is ok', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            const res = await request(app).delete(`/alerts/${nonFoundPreviousTrainAlert._id}`).send();
            expect(res.status).toBe(httpStatus.NO_CONTENT);
            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            expect(dbAlert).toBeNull();
        });

        test('should return 400 error if alertId is not a valid mongo id', async () => {
            const res = await request(app).delete('/alerts/invalidId').send();
            expect(res.status).toBe(httpStatus.BAD_REQUEST);
        });

        test('should return 404 error if alert is not found', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            const res = await request(app).delete(`/alerts/${foundPreviousTrainAlert._id}`).send();
            expect(res.status).toBe(httpStatus.NOT_FOUND);
        });
    });
});
