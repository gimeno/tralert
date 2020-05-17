const winston = require('winston');
const Logsene = require('winston-logsene');

const { NODE_ENV, LOGS_TOKEN } = process.env;

const enumerateErrorFormat = winston.format((info) => {
    const formattedInfo = info;

    const { message, error } = info;
    if (message.error instanceof Error) {
        formattedInfo.message = message.error.stack;
    } else if (error instanceof Error) {
        formattedInfo.message += `\n${error.stack}`;
    }

    return formattedInfo;
});

const commonFormat = winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.splat(),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
            commonFormat
        )
    }),
    new winston.transports.File({
        level: 'info',
        filename: './logs/app.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: commonFormat
    })
];

if (NODE_ENV === 'production' && LOGS_TOKEN) {
    transports.push(
        new Logsene({
            token: LOGS_TOKEN,
            url: 'https://logsene-receiver.eu.sematext.com/_bulk'
        })
    );
}

const logger = winston.createLogger({
    level: NODE_ENV === 'development' ? 'debug' : 'info',
    transports,
    exitOnError: false
});

if (NODE_ENV === 'production' && !LOGS_TOKEN) {
    logger.warn('We are in production mode and there is no logs token, logs are not being sent');
}

module.exports = logger;
