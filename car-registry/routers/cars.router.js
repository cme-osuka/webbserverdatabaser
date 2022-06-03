const express = require("express");

// Controller för Cars
const carsController = require("./controllers/cars.controller")

// Router för Cars
const carsRouter = express.Router();

carsRouter.get("/cars", carsController.getCars)
carsRouter.get("/cars/:id", carsController.getCar)
carsRouter.post("/cars", carsController.addCar)
carsRouter.delete("/cars/:id", carsController.deleteCar)

module.exports = carsRouter;