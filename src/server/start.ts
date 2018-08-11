import os from 'os';

import server from './server';
import { NODE_ENV } from './util/env';
import logger from './util/logger';

const numberOfCPUs = os.cpus().length;
logger.info(`CPUs detected: ${numberOfCPUs}`);

// Start worker if in development mode.
if (NODE_ENV === 'development') {
  require('./worker');
}

// Start the server.
server();
