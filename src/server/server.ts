import errorHandler from 'errorhandler';

import app from './app';
import { ROOT_URL, validateEnvironment } from './util/env';

validateEnvironment();

/**
 * Error Handler. Provides full stack - remove for production
 */
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
export default function server(): void {
  const server = app.listen(app.get('port'), () => {
    console.log(
      `App is running on PID ${process.pid} at ${ROOT_URL} in ${app.get(
        'env'
      )} mode`
    );
    console.log('  Press CTRL-C to stop\n');
  });
}
