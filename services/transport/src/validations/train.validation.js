const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const getTrains = {
    query: Joi.object().keys({
        from: Joi.string().required(),
        to: Joi.string().disallow(Joi.ref('from')).required(),
        departDate: Joi.date().utc().format('DD-MM-YYYY').greater('now').required(),
        returnDate: Joi.date().utc().format('DD-MM-YYYY').min(Joi.ref('departDate'))
    })
};

module.exports = {
    getTrains
};
