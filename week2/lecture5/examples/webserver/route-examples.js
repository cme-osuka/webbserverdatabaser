const http = require("http");

const port = 5001;

const users = JSON.stringify(["Oscar", "Karl", "Peter", "Roland"]);
const courses = JSON.stringify(["Node.js", "React", "HTML/CSS"]);

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  switch (req.url) {
    case "/users":
      res.writeHead(200);
      res.end(users);
      break;
    case "/courses":
      res.writeHead(200);
      res.end(courses);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, () => {
  console.log(`Servern kör på port ${port}`);
});
