const fs = require("fs/promises");

const rename = async () => {
  try {
    await fs.rename("./text2.txt", "./test/text.txt");
    console.log("Bytt namn på text.txt");
  } catch (err) {
    console.error(err.message);
  }
}

rename();