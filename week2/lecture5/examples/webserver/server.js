const http = require("http");

const port = 5001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World?</h1>")
})

server.listen(port, () => {
  console.log(`Servern kör på port ${port}`)
})