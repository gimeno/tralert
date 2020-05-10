const httpStatus = require('http-status');
const { catchAsync } = require('@tralert/utils');
const { alertService } = require('../services');

const createAlert = catchAsync(async (req, res) => {
    const alert = await alertService.createAlert(req.body);
    res.status(httpStatus.CREATED).send(alert.transform());
});

const getAlerts = catchAsync(async (req, res) => {
    const alerts = await alertService.getAlerts(req.query);
    const response = alerts.map((alert) => alert.transform());
    res.send(response);
});

const getAlert = catchAsync(async (req, res) => {
    const alert = await alertService.getAlertById(req.params.alertId);
    res.send(alert.transform());
});

const updateAlert = catchAsync(async (req, res) => {
    const alert = await alertService.updateAlert(req.params.alertId, req.body);
    res.send(alert.transform());
});

const deleteAlert = catchAsync(async (req, res) => {
    await alertService.deleteAlert(req.params.alertId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createAlert,
    getAlerts,
    getAlert,
    updateAlert,
    deleteAlert
};
