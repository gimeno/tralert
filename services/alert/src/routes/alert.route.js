const express = require('express');
const { validate } = require('@tralert/middlewares');
const { alertValidation } = require('../validations');
const { alertController } = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(validate(alertValidation.getAlerts), alertController.getAlerts)
    .post(validate(alertValidation.createAlert), alertController.createAlert);

router
    .route('/:alertId')
    .get(validate(alertValidation.getAlert), alertController.getAlert)
    .patch(validate(alertValidation.updateAlert), alertController.updateAlert)
    .delete(validate(alertValidation.deleteAlert), alertController.deleteAlert);

module.exports = router;
