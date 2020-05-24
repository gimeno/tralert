const axios = require('axios').default;
const moment = require('moment');
const { logger } = require('@tralert/logger');
const { transportServiceUrl, formatDate } = require('../config/config');

const fetchTrainsForAlert = async ({ id, origin, destination, departDate }) => {
    try {
        logger.info(`Get trains for alert ${id} - start`);
        const response = await axios.get(`${transportServiceUrl}/trains`, {
            params: {
                from: origin,
                to: destination,
                departDate: moment(departDate).format(formatDate)
            }
        });
        logger.info(`Get trains for alert ${id} - finish`);
        return response.data;
    } catch (error) {
        logger.error(`Error connection to transport service for alert ${id}`, { error });
        return [];
    }
};

module.exports = {
    fetchTrainsForAlert
};
