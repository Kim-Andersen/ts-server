import os from 'os';

import server from './server';
import logger from './util/logger';

const numberOfCPUs = os.cpus().length;
logger.info(`CPUs detected: ${numberOfCPUs}`);

// Start worker if in development mode.
// if (NODE_ENV === 'development' || numberOfCPUs == 1) {
require('./worker');
// }

// Start the server.
server();
