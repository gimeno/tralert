const nodemailer = require('nodemailer');
const { logger } = require('@tralert/logger');
const Table = require('easy-table');
const { env, email } = require('../config/config');

const transport = nodemailer.createTransport(email.smtp);
/* istanbul ignore next */
if (env !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options'));
}

const sendEmail = async (to, subject, text) => {
    const msg = { from: email.from, to, subject, text };
    await transport.sendMail(msg);
};

const sendAlertsEmail = async (to, data) => {
    if (!to) {
        return;
    }
    const tableData = Table.print(data);
    const subject = 'New transports found';
    const text = `Dear user,
        This new transports were found.
        ${tableData}
        Kind regards`;
    await sendEmail(to, subject, text);
};

module.exports = {
    transport,
    sendEmail,
    sendAlertsEmail
};
