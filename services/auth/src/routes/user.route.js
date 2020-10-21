const express = require('express');
const { validate } = require('@tralert/middlewares');
const { userValidation } = require('../validations');
const { userController } = require('../controllers');

const router = express.Router();

router.route('/:userId').patch(validate(userValidation.updateUserEmail), userController.updateUserEmail);

module.exports = router;
