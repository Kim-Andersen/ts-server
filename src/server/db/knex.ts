// @flow
import knexConfig from 'knex';

import { NODE_ENV, POSTGRES_URL } from '../util/env';

// const debug = require("debug")("business:db:knex");
export const knex = knexConfig({
  client: 'pg',
  // connection: { database: 'kiddo_test', user: 'superuser' },
  connection: POSTGRES_URL + (NODE_ENV === 'production' ? '?ssl=true' : ''),
  // ssl: process.env.NODE_ENV === 'production',
  // debug: (process.env.NODE_ENV !== 'production'),
  searchPath: 'knex,public'
});

// const knexPostgis = require("knex-postgis")(knex);

function cleanup() {
  knex.destroy(() => {
    // debug('Knex connection destroyed due to app termination (SIGINT).');
    process.exit(0);
  });
}

// If the Node process ends, close the database connection.
process.on('SIGINT', function() {
  cleanup();
});

process.on('SIGTERM', function() {
  cleanup();
});

// Lets be a little extra careful here with the connection string.
// We dont wan't to connect to the wrong database here.
// const NODE_ENV: string = process.env.NODE_ENV || '',
//       DATABASE_URL: string = process.env.DATABASE_URL || '',
//       ENV_DB_MAP = {
//         development: 'postgres://localhost:5432/circle_dev',
//         test: 'postgres://localhost:5432/circle_test'
//       };
//
// // Make sure we're connecting to the correct database in development and test environments.
// if(ENV_DB_MAP[NODE_ENV] && DATABASE_URL !== ENV_DB_MAP[NODE_ENV]){
//   console.log(`db: This does not look right: process.env.NODE_ENV=${NODE_ENV}, process.env.DATABASE_URL=${DATABASE_URL}. Expected process.env.DATABASE_URL=${ENV_DB_MAP[NODE_ENV]}. Terminating process.`);
//   process.exit(1);
// }

// if(process.env.NODE_ENV === 'test'){
//   exports.__truncateTables = function(callback?: Function){
//     return knex.raw('TRUNCATE accounts, projects, project_members, addresses, callsheet_members, callsheets').then(() => {
//       if(typeof callback === 'function') callback();
//     });
//   };
// }

// exports.knexPostgis = knexPostgis;
