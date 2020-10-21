const { catchAsync } = require('@tralert/utils');
const { userService } = require('../services');

const updateUserEmail = catchAsync(async (req, res) => {
    const result = await userService.updateUserEmail(req.params.userId, req.body);
    res.send(result);
});

module.exports = {
    updateUserEmail
};
