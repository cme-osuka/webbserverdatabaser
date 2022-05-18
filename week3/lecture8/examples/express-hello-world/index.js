const express = require("express");
const cors = require("cors");

const PORT = 4001;

// Istället för http.createServer
const app = express();

// Med hjälp av den här Middlewaren, cors,
// kan vi halv-automagiskt fixa de vanligaste
// CORS-relaterade problemen
app.use(cors())

const students = ["Macke", "Oscar", "Ryan Dahl"];

app.get("/", (req, res) => {
  res.send("Hello World")
})

// Smidigt sätt att skriva en endpoint!
app.get("/students", (req, res) => {
  res.json(students);
})


// Nästan identisk med listen i http!
app.listen(PORT, () => {
  console.log("Servern kör på 4001");
})