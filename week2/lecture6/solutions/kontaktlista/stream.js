const fs = require("fs");

let data = "";

const readerStream = fs.createReadStream("./text1.txt");
const writeStream = fs.createWriteStream("./text2.txt");

readerStream.setEncoding("utf-8");

//readerStream.on("data", (chunk) => {})
readerStream.pipe(writeStream);

readerStream.on("end", () => {
  console.log("Färdigt!")
})