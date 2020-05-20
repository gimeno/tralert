const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { formatDate } = require('../config/config');

const getTrains = {
    query: Joi.object().keys({
        from: Joi.string().required(),
        to: Joi.string().disallow(Joi.ref('from')).required(),
        departDate: Joi.date().utc().format(formatDate).greater('now').required(),
        returnDate: Joi.date().utc().format(formatDate).min(Joi.ref('departDate'))
    })
};

module.exports = {
    getTrains
};
