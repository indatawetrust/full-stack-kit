exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments('id');
    table.string('username');
    table.string('password');
    table.string('password_digest');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};

