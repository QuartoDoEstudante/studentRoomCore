exports.up = knex => knex.schema.createTable("location", table => {
  table.increments('id').primary();
  table.integer('renter_id').references('id').inTable('users');
  table.integer('locator').references('id').inTable('users');
  table.integer('property_id').references('id').inTable('property');
  table.string('contract_start');
  table.string('contract_end');
  table.string('value');
  table.timestamp('created_date').defaultTo(knex.fn.now());
  table.timestamp('update_date').defaultTo(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("location");
