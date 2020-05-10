const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { objectId } = require('./custom.validation');

const FORMAT_DATE = 'DD-MM-YYYY';

const getAlerts = {
    query: Joi.object().keys({
        userId: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getAlert = {
    params: Joi.object().keys({
        alertId: Joi.string().custom(objectId)
    })
};

const createAlert = {
    body: Joi.object().keys({
        userId: Joi.string().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        departDate: Joi.date().utc().format(FORMAT_DATE).greater('now').required(),
        returnDate: Joi.date().utc().format(FORMAT_DATE).min(Joi.ref('departDate')),
        price: Joi.number().required()
    })
};

const updateAlert = {
    params: Joi.object().keys({
        alertId: Joi.required().custom(objectId)
    }),
    body: Joi.object()
        .keys({
            departDate: Joi.date().utc().format(FORMAT_DATE).greater('now'),
            returnDate: Joi.date().utc().format(FORMAT_DATE).min(Joi.ref('departDate')),
            price: Joi.number()
        })
        .min(1)
};

const deleteAlert = {
    params: Joi.object().keys({
        alertId: Joi.string().custom(objectId)
    })
};

module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert
};
