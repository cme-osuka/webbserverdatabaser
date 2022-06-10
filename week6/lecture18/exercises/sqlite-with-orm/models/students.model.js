
// Här har jag skapat ett gäng funktioner som en
// model kan tänkas ha och ett exempel-SQL statement.
// --------------------------------------------------
// Din uppgift här, är att implementera dessa med hjälp
// av en ORM - Knex i detta fallet, istället för bara sqlite.
//
// Du kan hitta exempel på dessa queries på:
// http://knexjs.org/guide/query-builder.html

function find() {
  // SELECT * FROM students
}

function findById(id) {
  // SELECT * FROM students WHERE id = $id;
}

function add(data) {
  // INSERT INTO students (name, email) VALUES ("Ryan", "ryan@dahl.dk")
}

function update(id, data) {
  // UPDATE students SET email = "ryan@hotmail.se" WHERE id = $id;
}

function remove(id) {
  // DELETE FROM students WHERE id = $id
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}