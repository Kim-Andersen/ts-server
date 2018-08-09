export default {
  development: {
    client: 'postgresql'
    // connection: 'postgres://localhost:5432/ts-server'
  }

  // test: {
  //   client: 'postgresql',
  //   connection: 'postgres://postgres@127.0.0.1:5432/kiddo_test'
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: process.env.DATABASE_URL + '?ssl=true',
  //   ssl: true,
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
