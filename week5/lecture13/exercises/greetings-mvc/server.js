const express = require("express");
const cors = require("cors");

const app = express();

const greetings = [
  "Hello",
  "Greetings",
  "Goodday",
  "How do you do",
  "Long time, no see",
  "Howdy",
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  //const index = Math.floor(Math.random() * greetings.length) + 1;
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.send(`${req.body.greeting} World`);
});

app.listen(4000, () => {
  console.log("Servern lyssnar på port 4000");
});
