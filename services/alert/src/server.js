process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const { createServer } = require('@tralert/express-app');
const app = require('./app');

const port = process.env.PORT || 5001;

createServer(app, port);
