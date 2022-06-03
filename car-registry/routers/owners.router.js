const express = require("express");

// Controller för Owners
const ownersController = require("../controllers/owners.controller");

// Router för Owners
const ownersRouter = express.Router();

ownersRouter.get("/owners", ownersController.getOwners)
ownersRouter.get("/owners/:id", ownersController.getOwner)
ownersRouter.post("/owners", ownersController.addOwner)
ownersRouter.delete("/owners/:id", ownersController.deleteOwner)

module.exports = ownersRouter;