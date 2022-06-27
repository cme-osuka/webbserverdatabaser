const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json("Hello World");
})

app.post("/", express.json(), (req, res) => {
  res.json(req.body)
})

module.exports = app;