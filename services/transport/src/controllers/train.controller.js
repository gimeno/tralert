const { catchAsync } = require('@tralert/utils');
const { trainService } = require('../services');

const getTrains = catchAsync(async (req, res, next) => {
    const trains = await trainService.getTrains(req.query);
    res.send(trains);
});

module.exports = {
    getTrains
};
