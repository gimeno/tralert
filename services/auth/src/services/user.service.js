const authUtil = require('../utils/auth.util');

const updateUserEmail = async (userID, updateBody) => {
    const user = await authUtil.updateUserEmail(userID, updateBody.email);
    return user;
};

module.exports = {
    updateUserEmail
};
