import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import path from 'path';

import apiRouter from './api/api-router';
import GraphQLRouter from './api/GraphQLRouter';
import configureSession from './config/configure-session';
import emailSigninCallbackController from './controllers/email-signin-callback';
import * as homeController from './controllers/home';
import reactRenderer from './react-renderer';
import { PORT } from './util/env';

// import session from 'express-session';
// import expressValidator from 'express-validator';
// import * as passportConfig from './config/passport';
// import * as apiController from './controllers/api';
// import * as contactController from './controllers/contact';
// import * as userController from './controllers/user';

// const MongoStore = mongo(session);

// Controllers (route handlers)
// API keys and Passport configuration
// Create Express server
const app = express();

// Connect to MongoDB
// const mongoUrl = MONGODB_URI;
// (<any>mongoose).Promise = bluebird;
// mongoose
//   .connect(
//     mongoUrl,
//     { useMongoClient: true }
//   )
//   .then(() => {
//     /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
//   })
//   .catch(err => {
//     console.log(
//       'MongoDB connection error. Please make sure MongoDB is running. ' + err
//     );
//     // process.exit();
//   });

// Express configuration
app.set('port', PORT);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

configureSession(app);

// Session store.

// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//       url: mongoUrl,
//       autoReconnect: true
//     })
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  // res.locals.user = req.user;
  next();
});

// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (
//     !req.user &&
//     req.path !== '/login' &&
//     req.path !== '/signup' &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)
//   ) {
//     req.session.returnTo = req.path;
//   } else if (req.user && req.path == '/account') {
//     req.session.returnTo = req.path;
//   }
//   next();
// });

app.use(
  express.static(path.join(__dirname, '../../dist/public'), {
    maxAge: 31557600000
  })
);

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

app.get('/callback/email', emailSigninCallbackController);

// app.get('/login', userController.getLogin);
// app.post('/login', userController.postLogin);
// app.get('/logout', userController.logout);
// app.get('/forgot', userController.getForgot);
// app.post('/forgot', userController.postForgot);
// app.get('/reset/:token', userController.getReset);
// app.post('/reset/:token', userController.postReset);
// app.get('/signup', userController.getSignup);
// app.post('/signup', userController.postSignup);
// app.get('/contact', contactController.getContact);
// app.post('/contact', contactController.postContact);
// app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
// app.post(
//   '/account/profile',
//   passportConfig.isAuthenticated,
//   userController.postUpdateProfile
// );
// app.post(
//   '/account/password',
//   passportConfig.isAuthenticated,
//   userController.postUpdatePassword
// );
// app.post(
//   '/account/delete',
//   passportConfig.isAuthenticated,
//   userController.postDeleteAccount
// );
// app.get(
//   '/account/unlink/:provider',
//   passportConfig.isAuthenticated,
//   userController.getOauthUnlink
// );

/**
 * API examples routes.
 */

// app.get('/@:slug', function(req, res, next) {
//   const slug = (req.params['slug'] + '').toLowerCase();
//   if (slug.length === 0) {
//     return res.status(404).send('User not found');
//   } else {
//     return new UserModel()
//       .where({ slug })
//       .fetch({ require: false })
//       .then((user?: UserModel) => {
//         if (!user) {
//           return res.status(404).send('User not found');
//         } else {
//           return res.status(200).send(renderPublicUserProfilePage(user));
//         }
//       });
//   }
// });

// app.get(/^@[a-z0-9]+(?:-[a-z0-9]+)*/i, function(req, res) {
//   res.status(200).send(req.params['slug']);
// });

app.get('/app', reactRenderer);

// app.use('/api', ApiRouter.create().router);
app.use('/api/graphql', new GraphQLRouter().router);

// REST api.
app.use('/api/rest', apiRouter);

app.get('*', function(req, res, next) {
  return reactRenderer(req, res, next);
});

// app.get(
//   '/api/facebook',
//   passportConfig.isAuthenticated,
//   passportConfig.isAuthorized,
//   apiController.getFacebook
// );

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get(
//   '/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
// );
// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect(req.session.returnTo || '/');
//   }
// );

export default app;
