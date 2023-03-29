const config = require("../../../knexfile");

const knex = require("Knex");

const connection = knex(config.development);

module.exports = connection;