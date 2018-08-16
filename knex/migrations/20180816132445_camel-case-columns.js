exports.up = function(knex, Promise) {
  return knex.schema
    .table('project', table => {
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('created_by', 'createdBy');
    })
    .table('project_user', table => {
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('user_id', 'userId');
      table.renameColumn('project_id', 'projectId');
    })
    .table('user', table => {
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('login_count', 'loginCount');
      table.renameColumn('last_login_at', 'lastLoginAt');
    })
    .table('email_signin', table => {
      table.renameColumn('created_at', 'createdAt');
      table.renameColumn('updated_at', 'updatedAt');
      table.renameColumn('user_id', 'userId');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .table('project', table => {
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('createdBy', 'created_by');
    })
    .table('project_user', table => {
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('userId', 'user_id');
      table.renameColumn('projectId', 'project_id');
    })
    .table('user', table => {
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('loginCount', 'login_count');
      table.renameColumn('lastLoginAt', 'last_login_at');
    })
    .table('email_signin', table => {
      table.renameColumn('createdAt', 'created_at');
      table.renameColumn('updatedAt', 'updated_at');
      table.renameColumn('userId', 'user_id');
    });
};
