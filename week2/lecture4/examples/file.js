const fs = require("fs");



const fs = require("fs/promises");
const message = "\nNågot gick fel i file.js";

async function write() {
  try {
    await fs.writeFile("logs.txt", message, { flag: "a" });
    console.log("Wrote to file");
  } catch (err) {
    console.log(err);
  }
}

/*
const message = "\nNågot gick fel i file.js";

fs.writeFile("logs.txt", message, { flag: "a" }, (error) => {
  if (error) throw error;
  console.log("Filen har sparats");
})*/