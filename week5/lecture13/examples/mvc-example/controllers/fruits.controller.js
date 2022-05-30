const model = require("../models/fruits.model");

function getFruits(req, res) {
  const result = model.getAll();
  res.send(result) // Detta är viewen i Express
}

function addFruit(req, res) {
  const result = model.add(req.body.fruit);
  res.send(result) // Detta är viewen i Express
}

module.exports = {
  getFruits,
  addFruit
}