import RedisStoreConfig from 'connect-redis';
import { Application } from 'express';
import session from 'express-session';

import { NODE_ENV, REDIS_HOST, REDIS_PORT, SESSION_SECRET } from './util/env';

export default function configureSession(app: Application) {
  const RedisStore = RedisStoreConfig(session);
  app.use(
    session({
      store: new RedisStore({
        host: REDIS_HOST,
        port: REDIS_PORT
      }),
      secret: SESSION_SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 24 * 365,
        secure: NODE_ENV === 'production'
      }
    })
  );
}
