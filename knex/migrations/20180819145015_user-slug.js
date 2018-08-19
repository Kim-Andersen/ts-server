exports.up = function(knex, Promise) {
  return knex.schema.table('user', table => {
    table.string('slug', 100).unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', table => {
    table.dropColumn('slug');
  });
};
