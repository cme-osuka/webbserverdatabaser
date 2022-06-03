const uuid = require("uuid");

const model = require("../models/owners.model");

const { owners } = model;

function getOwners(req, res) {
  const result = model.findAll();

  res.json(result);
}

function getOwner(req, res) {
  const foundOwner = owners.find((owner) => owner.id === req.params.id);

  /* Detta var ett exempel på hur vi skapar en relation 
    så som den hade sett ut i SQL

  // 1. Filtrerar ut de relevanta relationerna
  const foundRelations = relations.filter(
    (rel) => rel.ownerId === req.params.id
  );

  // 2. På de relationerna vi fått fram, så behöver vi hitta respektive bil per id
  const foundCars = foundRelations.map((rel) => {
    // rel = { carId: "", ownerId: "" }
    const foundCar = cars.find((car) => car.id === rel.carId);
    return foundCar;
  });
  */

  res.json({
    owner: foundOwner,
    //cars: foundCars,
  });
}

function addOwner(req, res) {
  owners.push({
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    license: req.body.license,
  });

  res.json(owners);
}

function deleteOwner(req, res) {
  model.deleteOne(req.params.id);
  res.json(owners);
}

module.exports = {
  getOwners,
  getOwner,
  addOwner,
  deleteOwner,
};
