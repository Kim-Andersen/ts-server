import winston from 'winston';

import { NODE_ENV } from './env';

const logger = winston.createLogger({
  // transports: [
  //   new winston.transports.Console({
  //     level: NODE_ENV === 'production' ? 'info' : 'debug',
  //     handleExceptions: true,
  //     format: winston.format.json()
  //   }),
  //   new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  // ],
  exitOnError: false,
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

/**
 * If we're not in production then log to the `console` with the format:
 * `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
 */
if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

winston.format.colorize();

if (NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
