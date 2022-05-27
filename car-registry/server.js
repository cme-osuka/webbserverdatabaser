const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();

/**
 * {
 *   id: string,
 *   name: string,
 *   age: number,
 *   email: string,
 *   license: boolean
 * }
 */
let owners = [];

/**
 * {
 *   id: string
 *   maker: string,
 *   model: string,
 *   reg: string,
 *   mileage: number,
 *   year: number,
 *   combi: boolean
 * }
 */
let cars = [];

/**
 * {
 *   carId: string,
 *   ownerId: string
 * }
 */
const relations = [];

// Middlewares
app.use(bodyParser.json());

app.post("/relations", (req, res) => {
  relations.push({
    carId: req.body.carId,
    ownerId: req.body.ownerId
  })
  res.json(relations);
})

// Router för Owners
const ownersRouter = express.Router();

ownersRouter.get("/owners", (req, res) => {
  res.json(owners);
})

ownersRouter.get("/owners/:id", (req, res) => {
  const foundOwner = owners.find((owner) => owner.id === req.params.id)
  
  // 1. Filtrerar ut de relevanta relationerna
  const foundRelations = relations.filter((rel) => rel.ownerId === req.params.id);

  // 2. På de relationerna vi fått fram, så behöver vi hitta respektive bil per id
  const foundCars = foundRelations.map(((rel) => {
    // rel = { carId: "", ownerId: "" }
    const foundCar = cars.find((car) => car.id === rel.carId)
    return foundCar;
  }))

  // 3. Returnera ägare och dess bilar
  res.json({
    owner: foundOwner,
    cars: foundCars
  });
})

ownersRouter.post("/owners", (req, res) => {
  owners.push({
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    license: req.body.license
  })

  res.json(owners);
})
ownersRouter.delete("/owners/:id", (req, res) => {
  owners = owners.filter((owner) => owner.id !== req.params.id);
  res.json(owners);
})

// Router för Cars
const carsRouter = express.Router();

carsRouter.get("/cars", (req, res) => {
  res.json(cars);
})

carsRouter.get("/cars/:id", (req, res) => {
  const foundCar = cars.find((car) => car.id === req.params.id);

  res.json(foundCar);
})

carsRouter.post("/cars", (req, res) => {
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
})

carsRouter.delete("/cars/:id", (req, res) => {
  cars = cars.filter((car) => car.id !== req.params.id);
  res.json(cars);
})

app.use(ownersRouter);
app.use(carsRouter);

app.listen(4000, () => {
  console.log("Servern kör på port 4000");
})