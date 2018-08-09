exports.up = function(knex, Promise) {
  return knex.schema.createTable('email_signin', function(table) {
    table.increments();
    table.string('email', 100).notNullable();
    table.string('token', 100).notNullable();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('email_signin');
};
