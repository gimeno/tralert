const httpStatus = require('http-status');
const pick = require('lodash.pick');
const { ApiError } = require('@tralert/utils');
const { Alert } = require('../models');

const createAlert = async (alertBody) => {
    const alert = await Alert.create(alertBody);
    return alert;
};

const getQueryOptions = (query) => {
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    const sort = {};
    if (query.sortBy) {
        const parts = query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    return { limit, skip, sort };
};

const getAlerts = async (query) => {
    const filter = pick(query, ['userId']);
    const options = getQueryOptions(query);
    const alerts = await Alert.find(filter, null, options);
    return alerts;
};

const getAlertById = async (alertId) => {
    const alert = await Alert.findById(alertId);
    if (!alert) {
        throw new ApiError({ status: httpStatus.NOT_FOUND, message: 'Alert not found' });
    }
    return alert;
};

const getAlertsDepartDateFromToday = async () => {
    const alerts = await Alert.find({
        departDate: { $gte: Date.now() }
    });
    return alerts;
};

const updateAlert = async (alertId, updateBody) => {
    const alert = await getAlertById(alertId);
    Object.assign(alert, updateBody);
    await alert.save();
    return alert;
};

const deleteAlert = async (alertId) => {
    const alert = await getAlertById(alertId);
    await alert.remove();
    return alert;
};

module.exports = {
    createAlert,
    getAlerts,
    getAlertById,
    getAlertsDepartDateFromToday,
    updateAlert,
    deleteAlert
};
