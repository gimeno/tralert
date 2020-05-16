const nodemailer = require('nodemailer');
const { logger } = require('@tralert/logger');
const Table = require('easy-table');

const { NODE_ENV, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, EMAIL_FROM } = process.env;

const config = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
};

const transport = nodemailer.createTransport(config);
/* istanbul ignore next */
if (NODE_ENV !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options'));
}

const sendEmail = async (to, subject, text) => {
    const msg = { from: EMAIL_FROM, to, subject, text };
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
