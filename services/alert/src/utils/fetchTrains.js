const axios = require('axios').default;
const moment = require('moment');
const { logger } = require('@tralert/logger');

const FORMAT_DATE = 'DD-MM-YYYY';
const transportServiceURL = process.env.TRANSPORT_URL || 'http://localhost:5000/trains';

const fetchTrainsForAlert = async ({ id, origin, destination, departDate }) => {
    try {
        logger.info(`Get trains for alert ${id} - start`);
        const response = await axios.get(transportServiceURL, {
            params: {
                from: origin,
                to: destination,
                departDate: moment(departDate).format(FORMAT_DATE)
            }
        });
        logger.info(`Get trains for alert ${id} - finish`);
        return response.data;
    } catch (err) {
        logger.error(`Error connection to transport service for alert ${id}`, err);
        return [];
    }
};

module.exports = fetchTrainsForAlert;
