const { CronJob } = require('cron');
const { logger } = require('@tralert/logger');
const alertService = require('./alert.service');
const emailService = require('./email.service');
const trainsUtil = require('../utils/trains.util');
const authUtil = require('../utils/auth.util');

const handleTrainTransport = async (alert) => {
    const validTrain = (train) => {
        return train.trainType.toLowerCase().includes('ave') && parseInt(train.price, 10) <= alert.price;
    };
    const newFoundTrains = [];
    let wereThereAlreadyFoundTrains = false;

    const trains = await trainsUtil.fetchTrainsForAlert(alert);
    trains.forEach((train) => {
        if (validTrain(train)) {
            const newTrainData = { transportId: train.trainId, price: train.price, transportType: 'train' };
            if (alert.previousTransports.length === 0) {
                alert.previousTransports.push(newTrainData);
                newFoundTrains.push(train);
            } else {
                wereThereAlreadyFoundTrains = true;
                const foundTrainIndex = alert.previousTransports.findIndex(
                    (t) => t.transportId === newTrainData.transportId
                );
                if (foundTrainIndex === -1) {
                    alert.previousTransports.push(newTrainData);
                    newFoundTrains.push(train);
                } else {
                    const foundTrain = alert.previousTransports[foundTrainIndex];
                    if (parseInt(foundTrain.price, 10) > parseInt(newTrainData.price, 10)) {
                        foundTrain.price = newTrainData.price;
                        newFoundTrains.push(train);
                    }
                }
            }
        }
    });

    if (newFoundTrains.length > 0) {
        await alert.save();
    }

    return {
        newFoundTrains,
        wereThereAlreadyFoundTrains
    };
};

const handleAlert = async (alert) => {
    const trainsResult = await handleTrainTransport(alert);

    if (trainsResult.newFoundTrains.length > 0) {
        const userEmail = await authUtil.getUserEmail(alert.userId);
        if (!userEmail) {
            logger.warn(`No email was found for user ${alert.userId} and alert ${alert.id}`);
            return;
        }
        await emailService.sendAlertsEmail(userEmail, trainsResult.newFoundTrains);
    }
};

const cronAlertJobFn = async () => {
    logger.info('Start cron job');
    const alertsToCheck = await alertService.getAlertsDepartDateFromToday();
    logger.info(`Alerts to be checked ${alertsToCheck.length}`);
    if (alertsToCheck.length > 0) {
        try {
            alertsToCheck.forEach(handleAlert);
        } catch (err) {
            logger.error(`Error while handling cron job iterating alerts: ${err}`);
        }
    }
};

const createCronJob = (pattern) => {
    return new CronJob(pattern, cronAlertJobFn);
};

module.exports = {
    createCronJob,
    cronAlertJobFn,
    handleAlert
};
