const mongoId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('{{#label}} must be a valid mongo id');
    }
    return value;
};

const auth0Id = (value, helpers) => {
    if (!value.match(/^auth0\|[0-9a-zA-Z]+$/)) {
        return helpers.message('{{#label}} must be a valid auth0 id');
    }
    return value;
};

module.exports = {
    mongoId,
    auth0Id
};
