exports.up = knex => knex.schema.createTable("assessments", table => {
  table.increments('id').primary();
  table.integer('property').references('id').inTable('property');
  table.integer('author').references('id').inTable('users');
  table.string('note', 500).notNullable();
  table.timestamp('created_date').defaultTo(knex.fn.now());
  table.timestamp('update_date').defaultTo(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("assessments");
