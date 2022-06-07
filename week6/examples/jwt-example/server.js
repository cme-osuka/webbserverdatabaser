require("dotenv").config();
const express = require("express");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

// Middleware requires
const auth = require("./middlewares/auth");

// Models
const user = require("./models/user");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.post("/register", async (req, res) => {
  // Få ut användarens input
  const { username, email, password } = req.body;

  // Validera användarens input
  if (!username || !email || !password) {
    return res.status(400).send("Du måste skicka med all input");
  }

  // Kolla om om användaren finns redan
  const existingUser = await user.getOne(email);

  if (existingUser) {
    return res.status(400).send("Användaren finns redan");
  }

  // Kryptera lösenordet och förbereda datan
  const newUser = {
    username,
    email,
    password: md5(password),
  };

  // Lägga till användaren till databasen
  await user.addOne(newUser);

  // Svara med användarinfon
  res.json(newUser);
});

app.post("/login", async (req, res) => {
  // Läsa ut användarens input
  const { email, password } = req.body;

  // Validera så användaren har skickat in info
  if (!email || !password) {
    return res.status(400).send("Du måste skicka in email och lösenord");
  }

  // Validera så användaren finns
  const existingUser = await user.getOne(email);

  if (!existingUser) {
    return res.status(404).send("Användaren finns inte");
  }
  // Validera lösenordet och kolla så det matchar det vi sparat
  const hashedPassword = md5(password);

  if (existingUser.password !== hashedPassword) {
    return res.status(400).send("Lösenordet matchade inte");
  }

  // Svara med en JWT token
  const token = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    },
    process.env.SECRET_KEY
  );

  res.json(token);
});

app.get("/welcome", auth, async (req, res) => {
  const result = await user.getAll();

  res.json({
    user: req.user,
    result
  });
});

app.listen(4000, () => {
  console.log("Servern kör på port 4000");
});
