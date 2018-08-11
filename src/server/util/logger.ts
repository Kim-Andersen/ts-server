import winston from 'winston';

import { NODE_ENV } from './env';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      // level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
      level: NODE_ENV === 'production' ? 'debug' : 'debug'
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
