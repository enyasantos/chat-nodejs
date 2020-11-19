exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('id').primary();

        table.string('username').notNullable();
        table.string('image').notNullable();

        table.string('id_access').notNullable().unique();

        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('update_at').default(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

