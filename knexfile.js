module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost:5432/ts-server-dev',
    seeds: {
      directory: 'knex/seeds'
    },
    migrations: {
      directory: 'knex/migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL + '?ssl=true',
    ssl: true,
    seeds: {
      directory: 'knex/seeds'
    },
    migrations: {
      directory: 'knex/migrations'
    }
  }

  // test: {
  //   client: 'postgresql',
  //   connection: 'postgres://postgres@127.0.0.1:5432/kiddo_test'
  // },
};
