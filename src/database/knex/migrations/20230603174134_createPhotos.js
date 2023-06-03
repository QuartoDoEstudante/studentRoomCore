
exports.up = knex => knex.schema.createTable("photos", table => {
  table.increments('id').primary();
  table.string('photo');
  table.integer('property').references('id').inTable('property');
  table.timestamp('created_date').defaultTo(knex.fn.now());
  table.timestamp('update_date').defaultTo(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("photos");
