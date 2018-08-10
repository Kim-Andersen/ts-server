import dotenv from 'dotenv';
import { isEmpty, isNumber, isString } from 'lodash';

import logger from './logger';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.development' });

export const NODE_ENV = process.env.NODE_ENV!;
export const PORT = parseInt(process.env.PORT!, 10);
export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const REDIS_HOST = process.env.REDIS_HOST!;
export const REDIS_PORT = parseInt(process.env.REDIS_PORT!, 10);
export const SESSION_SECRET = process.env.SESSION_SECRET!;

function isEmptyString(value: any): boolean {
  return !isString(value) || isEmpty(value);
}

// Validation.
export function validateEnvironment(): void {
  let exit = false;

  if (isEmptyString(NODE_ENV)) {
    logger.error(
      'No ENVIRONMENT string found. Set ENVIRONMENT environment variable.'
    );
    exit = true;
  }
  if (!PORT || !isNumber(PORT)) {
    logger.error('No PORT number found. Set PORT environment variable.');
    exit = true;
  }
  if (isEmptyString(POSTGRES_URL)) {
    logger.error(
      'No POSTGRES_URL string found. Set POSTGRES_URL environment variable.'
    );
    exit = true;
  }
  if (isEmptyString(REDIS_HOST)) {
    logger.error(
      'No REDIS_HOST string found. Set REDIS_HOST environment variable.'
    );
    exit = true;
  }
  if (!REDIS_PORT || !isNumber(REDIS_PORT)) {
    logger.error(
      'No REDIS_PORT number found. Set REDIS_PORT environment variable.'
    );
    exit = true;
  }
  if (isEmptyString(SESSION_SECRET)) {
    logger.error(
      'No SESSION_SECRET string found. Set SESSION_SECRET environment variable.'
    );
    exit = true;
  }

  if (exit) {
    process.exit(1);
  }
}
