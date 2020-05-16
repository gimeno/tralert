/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const { cronService, emailService } = require('../services');
const setupTestDB = require('./setupTestDB');
const { Alert } = require('../models');
const trainsUtil = require('../utils/trains.util');
const authUtil = require('../utils/auth.util');
const transports = require('./fixtures/transport.fixture');
const {
    pastDepartureDateAlert,
    nonFoundPreviousTrainAlert,
    foundPreviousTrainAlert,
    insertAlerts
} = require('./fixtures/alert.fixture');

setupTestDB();

jest.mock('../utils/trains.util');
jest.mock('../utils/auth.util');

describe('Cron service', () => {
    describe('createCronJob method', () => {
        test('should only fetch transports of alerts which depart date is not in the past', async () => {
            const date = moment().add(1, 'd');
            const job = cronService.createCronJob(date);
            expect(job.start).toBeInstanceOf(Function);
            expect(job.nextDates()).toEqual(date);
        });
    });

    describe('cronAlertJobFn method', () => {
        test('should not fetch transports if there are no alerts', async () => {
            trainsUtil.fetchTrainsForAlert.mockResolvedValue([]);
            await cronService.cronAlertJobFn();
            expect(trainsUtil.fetchTrainsForAlert).toHaveBeenCalledTimes(0);
        });

        test('should only fetch transports of alerts which depart date is not in the past', async () => {
            await insertAlerts([pastDepartureDateAlert, nonFoundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue([]);
            await cronService.cronAlertJobFn();
            expect(trainsUtil.fetchTrainsForAlert).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleAlert method', () => {
        const fakeEmail = 'fake@gmail.com';
        let sendAlertsEmailSpy;

        beforeEach(() => {
            trainsUtil.fetchTrainsForAlert.mockClear();
            jest.spyOn(authUtil, 'getUserEmail').mockReturnValue(fakeEmail);
            jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue();
            sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');
        });

        test('should pass the alert to fetch transports', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue([]);
            await cronService.handleAlert(nonFoundPreviousTrainAlert);
            expect(trainsUtil.fetchTrainsForAlert).toHaveBeenCalledWith(nonFoundPreviousTrainAlert);
        });

        test('should not update the alert if there are no found transports', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue([
                {
                    trainId: 'tren03094',
                    departure: '09.30',
                    arrival: '10.51',
                    duration: '1 h. 21 min.',
                    trainType: 'AVE',
                    price: '50,70',
                    classType: 'Turista',
                    fare: 'Flexible'
                }
            ]);
            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: []
            });
            expect(sendAlertsEmailSpy).not.toHaveBeenCalled();
        });

        test('should update the alert with the found train if there was no train already', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue(transports);
            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: [{ transportId: 'tren03093', price: '20,70' }]
            });
            expect(sendAlertsEmailSpy).toHaveBeenCalledWith(fakeEmail, [transports[0]]);
        });

        test('should update the alert with the found train if there was found train already but the ID is different', async () => {
            await insertAlerts([foundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue(transports);
            const dbAlert = await Alert.findById(foundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(foundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: [
                    { transportId: 'tren03094', price: '20,70' },
                    { transportId: 'tren03093', price: '20,70' }
                ]
            });
            expect(sendAlertsEmailSpy).toHaveBeenCalledWith(fakeEmail, [transports[0]]);
        });

        test('should update the alert with the found train if there was found train already, the ID is the same and the price is smaller', async () => {
            await insertAlerts([foundPreviousTrainAlert]);
            const newCheapTrain = {
                trainId: 'tren03094',
                departure: '09.30',
                arrival: '10.51',
                duration: '1 h. 21 min.',
                trainType: 'AVE',
                price: '10,70',
                classType: 'Turista',
                fare: 'Flexible'
            };

            trainsUtil.fetchTrainsForAlert.mockResolvedValue([newCheapTrain]);
            const dbAlert = await Alert.findById(foundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(foundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: [{ transportId: 'tren03094', price: '10,70' }]
            });
            expect(sendAlertsEmailSpy).toHaveBeenCalledWith(fakeEmail, [newCheapTrain]);
        });

        test('should not update the alert with the found train if there was found train already, the ID is the same and the price is bigger', async () => {
            await insertAlerts([foundPreviousTrainAlert]);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue([
                {
                    trainId: 'tren03094',
                    departure: '09.30',
                    arrival: '10.51',
                    duration: '1 h. 21 min.',
                    trainType: 'AVE',
                    price: '25,70',
                    classType: 'Turista',
                    fare: 'Flexible'
                }
            ]);
            const dbAlert = await Alert.findById(foundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(foundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: [{ transportId: 'tren03094', price: '20,70' }]
            });
            expect(sendAlertsEmailSpy).not.toHaveBeenCalled();
        });

        test('should not call sendAlertsEmail if no user email is fetched', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);
            jest.spyOn(authUtil, 'getUserEmail').mockReturnValue(undefined);

            trainsUtil.fetchTrainsForAlert.mockResolvedValue(transports);
            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            expect(sendAlertsEmailSpy).not.toHaveBeenCalled();
        });
    });
});
