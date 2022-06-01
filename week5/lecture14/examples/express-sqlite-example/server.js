const express = require("express");

const db = require("./database");
const app = express();

app.get("/", (req, res) => {
  // Förbered ett SQL statement
  const sql = "SELECT * FROM user";
  const params = [];

  // Köra statementet
  db.all(sql, params, (error, rows) => {
    if (error) {
      // Om något gått fel i statementet
      res.status(400).json({ error: error.message })
    }

    // Om allt gått bra, svarar vi med rows!
    res.json({
      message: "success",
      data: rows
    })
  })
})

app.listen(4000, () => {
  console.log("Servern kör på port 4000");
})