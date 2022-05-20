const express = require("express");
const logger = require("morgan");
const app = express();
const PORT = 4000;

const wikiRouter = require("./routes/wiki"); 

const tokenCheck = (req, res, next) => {
  const tokenExists = true; 

  if (!tokenExists) {
    res.send("Du saknar en token, vänligen skicka med den här");
  } else {
    next()
  }
}

const enMiddleware = (req, res, next) => {
  console.log("Vår egna middleware kördes");
  next();
}

app.use(tokenCheck)
app.use(logger("dev")) // Väntar på res.send innan den skriver ut det i loggen
app.use("/wiki", (req, res, next) => {
  console.log("inline middleware");
  next();
})

app.use("/wiki", wikiRouter);

app.use(express.static("public"))
app.use("/media", express.static("images"))

// Routes för site root /
app.get("/", enMiddleware, (req, res) => {
  res.send("Hello World!");
})
//app.post("/", (req, res) => {})

// Routes för /secret
//app.get("/secret", (req, res) => {})

/*app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Något gick sönder!")
})*/

app.listen(PORT, () => {
  console.log(`Servern kör på port ${PORT}`);
})