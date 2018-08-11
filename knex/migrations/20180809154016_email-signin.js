exports.up = function(knex, Promise) {
  return knex.schema.createTable('email_signin', function(table) {
    table.increments();
    table.timestamps();
    table
      .string('email', 100)
      .unique()
      .notNullable();
    table
      .string('token', 100)
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('email_signin');
};
