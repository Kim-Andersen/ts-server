import errorHandler from 'errorhandler';

import app from './app';
import { validateEnvironment } from './util/env';

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
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
