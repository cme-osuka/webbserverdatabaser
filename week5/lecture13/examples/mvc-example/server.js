const express = require("express");

const fruitsRouter = require("./router/fruits.router");

// Skapar en express-app
const app = express();

// Deklarerar våra middlewares
app.use(express.json());

// Mounta våra routers
app.use("/fruits", fruitsRouter);

app.listen(4000, () => {
  console.log("Lyssnar på port 4000");
})