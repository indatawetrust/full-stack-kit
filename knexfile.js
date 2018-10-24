require('dotenv').config();

// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB,
      user: process.env.DEV_USER,
      password: process.env.DEV_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'staging',
      user: 'staging',
      password: 'staging',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'production',
      user: 'production',
      password: 'production',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  }
};
