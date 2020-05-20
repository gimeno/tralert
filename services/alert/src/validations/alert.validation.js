const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { formatDate } = require('../config/config');
const { mongoId, auth0Id } = require('./custom.validation');

const getAlerts = {
    query: Joi.object().keys({
        userId: Joi.string().custom(auth0Id),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getAlert = {
    params: Joi.object().keys({
        alertId: Joi.string().custom(mongoId).required()
    })
};

const createAlert = {
    body: Joi.object().keys({
        userId: Joi.string().custom(auth0Id).required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        departDate: Joi.date().utc().format(formatDate).greater('now').required(),
        returnDate: Joi.date().utc().format(formatDate).min(Joi.ref('departDate')),
        price: Joi.number().required()
    })
};

const updateAlert = {
    params: Joi.object().keys({
        alertId: Joi.string().custom(mongoId).required()
    }),
    body: Joi.object()
        .keys({
            departDate: Joi.date().utc().format(formatDate).greater('now'),
            returnDate: Joi.date().utc().format(formatDate).min(Joi.ref('departDate')),
            price: Joi.number()
        })
        .min(1)
};

const deleteAlert = {
    params: Joi.object().keys({
        alertId: Joi.string().custom(mongoId).required()
    })
};

module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert
};
