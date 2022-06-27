const knexConfig = require("./knexfile");
const knex = require("knex");

const db = knex(knexConfig["development"]);

/**
 * @exports knex
 */
module.exports = db;