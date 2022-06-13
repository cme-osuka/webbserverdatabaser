// Knex
const knex = {};

function update(id, data) {
  const sql = "UPDATE Posts SET title = $title, author = $author, post = $post WHERE $id";

  //knex("posts").update(data).where({ id: id })

  db.run(sql, data);
}
