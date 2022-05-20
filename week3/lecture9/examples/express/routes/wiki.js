const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Du är nu inne på wikin");
})

router.get("/about", (req, res) => {
  res.send("Om wiki-delen av den här webbservern")
})

module.exports = router;