const express = require("express");

const app = express();

// Med body-parser: bodyParser.json()
app.use(express.json())

// Definiera en view engine i Express
app.set("view engine", "pug");
// Pug endpoint
app.get("/", (req, res) => {
  res.render("index", { title: "Pug is awesome", message: "Voff!" })
})

app.get("/todos/:id/:fruit", (req, res) => {
  console.log(req.params);
  res.send(req.params);
})

// Todos array
const todos = [];

app.post("/todos", (req, res) => {
  todos.push({
    id: req.body.id,
    name: req.body.name,
    done: false
  })

  res.send(todos)
})

app.listen(4000, () => {
  console.log("Servern körs på port 4000");
})