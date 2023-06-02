
exports.up = knex => knex.schema.createTable("property", table => {
  table.increments('id').primary();
  table.integer('owner').references('id').inTable('users');
  table.string('title');
  table.string('description');
  table.integer('type');
  table.string('value');
  table.string('contact');
  table.integer('available');
  table.string('road');
  table.integer('number');
  table.string('cep');
  table.string('neighborhood');
  table.timestamp('created_date').defaultTo(knex.fn.now());
  table.timestamp('update_date').defaultTo(knex.fn.now());
})


exports.down = knex => knex.schema.dropTable("property");
