const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const ownersRouter = require("./routers/owners.router");
const carsRouter = require("./routers/cars.router");

// Middlewares
app.use(bodyParser.json());

app.use(ownersRouter);
app.use(carsRouter);

app.listen(4000, () => {
  console.log("Servern kör på port 4000");
})