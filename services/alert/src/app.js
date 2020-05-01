const { createCommonApiApp } = require('@tralert/express-app');
// const routes = require('./routes');
const routes = undefined;
const app = createCommonApiApp(routes);

module.exports = app;
