const express = require("express");

const app = express();

const cars = [];

app.use("/cars", express.json())

app.get("/cars", (req, res) => {
  res.send("Hello World");
})

app.post("/cars", (req, res) => {
  if (!req.body.reg) {
    return res.status(400).json({ error: "Regnr saknas" })
  }
  if (req.body.reg.length !== 6) {
    return res.status(400).json({ error: "Felaktigt regnr" })
  }

  cars.push({
    id: cars.length + 1,
    maker: req.body.maker || "Polestar",
    model: req.body.model || "2",
    reg: req.body.reg
  })

  res.send(cars);
})

app.put("/cars/:id", (req, res) => {
  if (!req.body.maker) {
    return res.status(400).json({ error: "Tillverkare saknas" })
  }

  const carIndex = cars.findIndex((car) => car.id === parseInt(req.params.id))
  if (carIndex === -1) {
    return res.status(404).json({ error: "Hittade ingen bil med det id't" })
  }

  const originalCar = cars[carIndex];

  cars[carIndex] = {
    id: originalCar.id,
    maker: req.body.maker,
    model: req.body.model,
    reg: req.body.reg
  }

  res.json(cars)
})

app.patch("/cars/:id", (req, res) => {
  const carIndex = cars.findIndex((car) => car.id === parseInt(req.params.id))
  if (carIndex === -1) {
    return res.status(404).json({ error: "Hittade ingen bil med det id't" })
  }

  if (req.body.reg) {
    cars[carIndex].reg = req.body.reg
  }

  if (req.body.maker) {
    cars[carIndex].maker = req.body.maker
  }

  if (req.body.model) {
    cars[carIndex].model = req.body.model
  }

  res.json(cars);
})

app.listen(4000, () => {
  console.log("Servern kör på port 4000");
})