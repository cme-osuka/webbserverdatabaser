const express = require("express");
const config = require("./knexfile");
const knex = require("knex");

// Sätta upp knex
const db = knex(config["development"]);

const app = express();

app.get("/", async (req, res) => {
  const dogs = await db.select().from("dogs");
  res.json(dogs);
});

app.post("/", express.json(), async (req, res) => {
  const newDog = await db
    .insert({
      name: req.body.name,
      age: req.body.age,
      color: req.body.color,
    }, "*")
    .into("dogs");

  res.json(newDog);
});

app.listen(4000, () => {
  console.log("Applikationen kör på port 4000");
});
