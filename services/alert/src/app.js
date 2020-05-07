const express = require('express');
const { addCommonHeaders, addErrorHandlers } = require('@tralert/express-app');

const app = express();
addCommonHeaders(express, app);

addErrorHandlers(app);

module.exports = app;
