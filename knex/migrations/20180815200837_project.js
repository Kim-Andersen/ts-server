exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('project', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.string('title', 100).notNullable();
      table.text('description');
      table
        .integer('created_by')
        .notNullable()
        .references('user.id');
    })
    .createTable('project_user', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table
        .integer('user_id')
        .notNullable()
        .references('user.id');
      table
        .integer('project_id')
        .notNullable()
        .references('project.id');
      table.unique(['user_id', 'project_id']);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('project_user')
    .then(() => knex.schema.dropTable('project'));
};
