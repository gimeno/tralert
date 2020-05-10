/* eslint-disable no-underscore-dangle */
const moment = require('moment');
const { cronService, emailService } = require('../services');
const setupTestDB = require('./setupTestDB');
const { Alert } = require('../models');
const fetchTrainsForAlert = require('../utils/fetchTrains');
const transports = require('./fixtures/transport.fixture');
const {
    pastDepartureDateAlert,
    nonFoundPreviousTrainAlert,
    foundPreviousTrainAlert,
    insertAlerts
} = require('./fixtures/alert.fixture');

setupTestDB();

jest.mock('../utils/fetchTrains');

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
        test('should only fetch transports of alerts which depart date is not in the past', async () => {
            await insertAlerts([pastDepartureDateAlert, nonFoundPreviousTrainAlert]);

            fetchTrainsForAlert.mockResolvedValue([]);
            await cronService.cronAlertJobFn();
            expect(fetchTrainsForAlert).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleAlert method', () => {
        beforeEach(() => {
            fetchTrainsForAlert.mockClear();
            jest.spyOn(emailService.transport, 'sendMail').mockResolvedValue();
        });

        test('should pass the alert to fetch transports', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);

            fetchTrainsForAlert.mockResolvedValue([]);
            await cronService.handleAlert(nonFoundPreviousTrainAlert);
            expect(fetchTrainsForAlert).toHaveBeenCalledWith(nonFoundPreviousTrainAlert);
        });

        test('should not update the alert if there are no found transports', async () => {
            await insertAlerts([nonFoundPreviousTrainAlert]);
            const sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');

            fetchTrainsForAlert.mockResolvedValue([
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
            const sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');

            fetchTrainsForAlert.mockResolvedValue(transports);
            const dbAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            await cronService.handleAlert(dbAlert);

            const updatedAlert = await Alert.findById(nonFoundPreviousTrainAlert._id);
            expect(updatedAlert).toBeDefined();
            expect(updatedAlert.toJSON()).toMatchObject({
                id: dbAlert.id,
                previousTransports: [{ transportId: 'tren03093', price: '20,70' }]
            });
            expect(sendAlertsEmailSpy).toHaveBeenCalled();
        });

        test('should update the alert with the found train if there was found train already but the ID is different', async () => {
            await insertAlerts([foundPreviousTrainAlert]);
            const sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');

            fetchTrainsForAlert.mockResolvedValue(transports);
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
            expect(sendAlertsEmailSpy).toHaveBeenCalled();
        });

        test('should update the alert with the found train if there was found train already, the ID is the same and the price is smaller', async () => {
            await insertAlerts([foundPreviousTrainAlert]);
            const sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');

            fetchTrainsForAlert.mockResolvedValue([
                {
                    trainId: 'tren03094',
                    departure: '09.30',
                    arrival: '10.51',
                    duration: '1 h. 21 min.',
                    trainType: 'AVE',
                    price: '10,70',
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
                previousTransports: [{ transportId: 'tren03094', price: '10,70' }]
            });
            expect(sendAlertsEmailSpy).toHaveBeenCalled();
        });

        test('should not update the alert with the found train if there was found train already, the ID is the same and the price is bigger', async () => {
            await insertAlerts([foundPreviousTrainAlert]);
            const sendAlertsEmailSpy = jest.spyOn(emailService, 'sendAlertsEmail');

            fetchTrainsForAlert.mockResolvedValue([
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
    });
});
