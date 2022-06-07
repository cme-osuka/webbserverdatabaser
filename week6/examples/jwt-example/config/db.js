const sqlite3 = require("sqlite3").verbose();
const md5 = require("md5");

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }

  const usersStmt = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `;

  db.run(usersStmt, (error) => {
    if (error) {
      //console.error(error.message);
      //throw error;
    } else {
      const insert = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
      db.run(insert, ["ryandahl", "ryan@dahl.dk", md5("Macke123")])
    }
  })
});

module.exports = db;