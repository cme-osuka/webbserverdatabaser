/**
 * @module knex
 */
const knex = require("../data/database");

// Här har jag skapat ett gäng funktioner som en
// model kan tänkas ha och ett exempel-SQL statement.
// --------------------------------------------------
// Din uppgift här, är att implementera dessa med hjälp
// av en ORM - Knex i detta fallet, istället för bara sqlite.
//
// Du kan hitta exempel på dessa queries på:
// http://knexjs.org/guide/query-builder.html

async function findAll() {
  // SELECT * FROM students
  const result = await knex("students").select();
  return result;
}

async function findById(id) {
  // SELECT * FROM students WHERE id = $id;
  const result = await knex("students").select().where({ id: id });
  return result;
}

async function add({ name, email }) {
  // INSERT INTO students (name, email) VALUES ("Ryan", "ryan@dahl.dk")
  const result = await knex("students").insert({ name, email });
  return result;
}

function update(id, data) {
  // UPDATE students SET email = "ryan@hotmail.se" WHERE id = $id;
}

function remove(id) {
  // DELETE FROM students WHERE id = $id
}

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove
}