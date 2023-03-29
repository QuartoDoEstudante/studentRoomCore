
exports.up = knex => knex.schema.createTable("users", table => {
  table.increments('id').primary();
  table.string('name');
  table.string('email');
  table.string('password');
  table.timestamp('created_date').defaultTo(knex.fn.now());
  table.timestamp('update_date').defaultTo(knex.fn.now());

})


exports.down = knex => knex.schema.dropTable("users");
