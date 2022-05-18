const http = require("http");

const students = ["Ryan Dahl", "Markus", "Untz", "Aleks"];

const app = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    // Hämta data
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(students));
  }

  if (req.method === "POST") {
    // Skickar data
    req.on("data", (chunk) => {
      students.push(chunk.toString());
    });
    res.statusCode = 200;
    res.end();
  }
});

app.listen(4000, () => {
  console.log(`Servern lyssnar på port 4000`);
});
