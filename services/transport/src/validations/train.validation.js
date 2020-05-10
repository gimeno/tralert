const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const FORMAT_DATE = 'DD-MM-YYYY';

const getTrains = {
    query: Joi.object().keys({
        from: Joi.string().required(),
        to: Joi.string().disallow(Joi.ref('from')).required(),
        departDate: Joi.date().utc().format(FORMAT_DATE).greater('now').required(),
        returnDate: Joi.date().utc().format(FORMAT_DATE).min(Joi.ref('departDate'))
    })
};

module.exports = {
    getTrains
};
