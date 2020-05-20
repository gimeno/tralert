const winston = require('winston');
const Logsene = require('winston-logsene');
const { env, logsToken } = require('@tralert/config');

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
            env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
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

if (env === 'production' && logsToken) {
    transports.push(
        new Logsene({
            token: logsToken,
            url: 'https://logsene-receiver.eu.sematext.com/_bulk'
        })
    );
}

const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    transports,
    exitOnError: false
});

if (env === 'production' && !logsToken) {
    logger.warn('We are in production mode and there is no logs token, logs are not being sent');
}

module.exports = logger;
