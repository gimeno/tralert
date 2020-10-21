const Joi = require('@hapi/joi');

const updateUserEmail = {
    params: Joi.object().keys({
        userId: Joi.string().required()
    }),
    body: Joi.object().keys({
        email: Joi.string().email().required()
    })
};

module.exports = {
    updateUserEmail
};
