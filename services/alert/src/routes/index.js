const express = require('express');
const alertRoute = require('./alert.route');

const router = express.Router();

router.use('/alerts', alertRoute);

module.exports = router;
