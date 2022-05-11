const fs = require("fs");

fs.writeFile("./text.txt", "Detta är också en text", { flag: "a" }, (err) => {
  if (err) throw err;
})