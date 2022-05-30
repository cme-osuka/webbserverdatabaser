const express = require("express");
const morgan = require("morgan");

const fruitsController = require("../controllers/fruits.controller");
const fruitsRouter = express.Router();

fruitsRouter.use(morgan("dev"))

fruitsRouter.get("/", fruitsController.getFruits)
fruitsRouter.post("/", fruitsController.addFruit)

module.exports = fruitsRouter;