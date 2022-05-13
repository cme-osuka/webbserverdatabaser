const http = require("http");

const port = 5001;

const students = [
  { id: 1, name: "Oscar" },
  { id: 2, name: "Macke" },
  { id: 3, name: "Adam" }
]

const app = http.createServer((req, res) => {
  console.log(`${req.method} till url: ${req.url}`);

  const items = req.url.split("/")
  console.log(items);

  if (items[1] === "students") {
    if (req.method === "GET" && items.length === 3) {
      // En student
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const studentIndex = parseInt(items[2]);
      res.end(JSON.stringify(students[studentIndex]))
    }
    if (req.method === "GET" && items.length === 2) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(students));
    }
    if (req.method === "POST") {
      // Här kanske vi vill ha lite logik

      req.on("data", (chunk) => {
        //console.log(chunk.toString());
        const data = chunk.toString();
        const newStudent = JSON.parse(data);

        students.push(newStudent);
      })

      res.statusCode = 201;
      res.end()
    }

  } else if (items[1] === "courses") {
    //res.writeHead(200, { "Content-Type": "text/html" });
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    res.write("<html>")
    res.write("<body>")
    res.write("<ul>")
    res.write("<li>Webbservrar och databaser</li>")
    res.write("<li>Javascript-ramverk</li>")
    res.write("</ul>")
    res.write("</body>")
    res.write("</html>")
    res.end()
  } else {
    res.statusCode = 404;
    res.end()
  }


})

app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
})