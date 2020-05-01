const express = require('express');
const { validate } = require('@tralert/middlewares');
const { trainValidation } = require('../validations');
const { trainController } = require('../controllers');

const router = express.Router();

router.get('/', validate(trainValidation.getTrains), trainController.getTrains);

module.exports = router;
