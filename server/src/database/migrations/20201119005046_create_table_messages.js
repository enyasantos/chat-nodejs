exports.up = function(knex) {
    return knex.schema.createTable('messages', function(table) {
        table.increments('id');

        table.string('user_id')
            .references('users.id')
            .unsigned()
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        table.string('time').notNullable();
        table.string('content').notNullable(); 

        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('update_at').default(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};

