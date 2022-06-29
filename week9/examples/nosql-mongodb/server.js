const express = require("express");
const mongoose = require("mongoose");

// Ansluta till en Mongodb-databas med Mongoose
const MONGO_URL = "DIN_CONNECTION_STRING";
mongoose.connect(MONGO_URL);

// Definiera ditt Schema först
const catSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
});

// Sen skapar vi en modell med vårt Schema
const Cat = mongoose.model("Cat", catSchema);

// Skapa en katt
const myCat = new Cat({ name: "Luna", age: 7, color: "sand" });
/* För att spara vår nya katt till databasen
myCat.save((err) => {
  if (err) {
    console.error(err)
  }
});
*/
const app = express();

app.get("/", async (req, res) => {
  // Hittar alla katter
  const cats = await Cat.find({});
  res.json(cats);
});

app.get("/:name", async (req, res) => {
  // Hittar en katt
  const oneCat = await Cat.findOne({ name: req.params.name });
  res.json(oneCat);
});

app.post("/", express.json(), async (req, res) => {
  // Skapar en ny katt (genväg/shortcut för new Cat().save())
  const newCat = await Cat.create({
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
  });

  res.status(201).json(newCat);
});

app.listen(4000, () => {
  console.log("Vår applikation kör på port 4000");
});
