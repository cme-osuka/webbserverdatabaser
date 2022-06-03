const uuid = require("uuid");

const model = require("../models/cars.model");

function getCars(req, res) {
  const result = model.getAll();

  res.json(result);
}

function getCar(req, res) {
  const foundCar = cars.find((car) => car.id === req.params.id);

  res.json(foundCar);
}

function addCar(req, res) {
  cars.push({
    id: uuid.v4(),
    maker: req.body.maker,
    model: req.body.model,
    reg: req.body.reg,
    mileage: req.body.mileage,
    year: req.body.year,
    combi: req.body.combi
  })

  res.json(cars);
}

function deleteCar(req, res) {
  cars = cars.filter((car) => car.id !== req.params.id);
  res.json(cars);
}

module.exports = {
  getCars,
  getCar,
  addCar,
  deleteCar
}