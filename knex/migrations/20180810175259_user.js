exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table
        .string('email', 100)
        .unique()
        .notNullable();
      table.integer('login_count').defaultTo(0);
      table.timestamp('last_login_at');
    })
    .table('email_signin', function(table) {
      table
        .integer('user_id')
        .unique()
        .notNullable()
        .references('user.id');
    });
};

exports.down = function(knex, Promise) {
  return knex
    .table('email_signin', function(table) {
      table.dropColumn('user_id');
    })
    .then(() => knex.schema.dropTable('user'));
};
