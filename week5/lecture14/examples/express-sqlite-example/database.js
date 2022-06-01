const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    // Kunde inte öppna databasen
    console.error(error.message);
    throw error;
  }

  // Här kan vi anta att vi är anslutna
  console.log("Ansluten till vår databas");

  const statement = `CREATE TABLE user
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    email TEXT UNIQUE )`

  db.run(statement, (error) => {
    if (error) {
      // Om tabellen redan finns
      console.error(error.message);
      return;
    }

    const insert = "INSERT INTO user (name, email) VALUES (?, ?)"
    db.run(insert, ["Oscar", "oscar@osuka.dev"]);
    db.run(insert, ["Ryan Dahl", "ryan@dahl.dk"]);
    db.run(insert, ["Macke", "macke@piripiri.com"]);
    db.run(insert, ["Joakim", "joakim@piripiri.com"]);
  })
});

module.exports = db;