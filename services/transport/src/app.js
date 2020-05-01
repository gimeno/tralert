const { createCommonApiApp } = require('@tralert/express-app');
const routes = require('./routes');

const app = createCommonApiApp(routes);

module.exports = app;
