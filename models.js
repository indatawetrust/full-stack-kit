require('dotenv').config();

const knex = require('knex')({
  client: 'postgresql',
  connection: {
    database: process.env.DEV_DB,
    user: process.env.DEV_USER,
    password: process.env.DEV_PASS,
  },
});

const bookshelf = require('bookshelf')(knex);

const securePassword = require('bookshelf-secure-password');

bookshelf.plugin(securePassword);

const User = bookshelf.Model.extend({
  tableName: 'user',
  hasSecurePassword: true
});

module.exports = {
  User
}
