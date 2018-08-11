import os from 'os';

import server from './server';
import logger from './util/logger';

const numberOfCPUs = os.cpus().length;
logger.info(`CPUs detected: ${numberOfCPUs}`);

// Start the server.
server();
