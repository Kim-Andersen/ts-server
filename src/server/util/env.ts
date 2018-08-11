import dotenv from 'dotenv';
import { isEmpty, isString } from 'lodash';

import logger from './logger';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.development' });

export const ROOT_URL = process.env.ROOT_URL!;
export const NODE_ENV = process.env.NODE_ENV!;
export const PORT = parseInt(process.env.PORT!, 10);
export const POSTGRES_URL = process.env.POSTGRES_URL!;
export const REDIS_URL = process.env.REDIS_URL!;
export const SESSION_SECRET = process.env.SESSION_SECRET!;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;

const requiredVariables = [
  'PORT',
  'NODE_ENV',
  'ROOT_URL',
  'POSTGRES_URL',
  'REDIS_URL',
  'SESSION_SECRET',
  'SENDGRID_API_KEY'
];

export function validateEnvironment(): void {
  requiredVariables.forEach(key => {
    if (!isString(process.env[key]) || isEmpty(process.env[key])) {
      logger.error(
        `Critial: Missing required environment variable ${key} (string). Killing process.`
      );
      process.exit(1);
    }
  });
}
