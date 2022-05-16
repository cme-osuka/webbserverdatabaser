const http = require("http");

let people = [
  { 
    "id": 1,
    "name": "Kalle Karlsson", 
    "number": "044-123456"
  },
  { 
    "id": 2,
    "name": "Kurt Kurtsson", 
    "number": "044-5323523"
  },
  { 
    "id": 3,
    "name": "Yvonne Yvonnesdotter", 
    "number": "0709-230195"
  },
  { 
    "id": 4,
    "name": "Gert", 
    "number": "080-642343"
  }
]

const app = http.createServer((req, res) => {

  const items = req.url.split("/") 
  // /api/persons -> ["", "api", "persons"]
  // /api/persons/4 -> ["", "api", "persons", "4"]

  if (req.method === "GET" && items[2] === "persons" && items.length === 3) { 
    // GET /api/persons
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(people))
  } else if (req.method === "GET" && items[1] === "info") { 
    // GET /info
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.write("<html>");
    res.write("<body>");
    res.write(`<p>Din kontaktlista innehåller ${people.length} kontakter.</p>`);
    res.write(`<p>${new Date().toString()}</p>`)
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.method === "GET" && items[2] === "persons" && items.length === 4) {
    // GET /api/persons/:id
    const requestedId = parseInt(items[3]);
    const requestedPerson = people.find((person) => person.id === requestedId);

    if (requestedPerson) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(requestedPerson))
    } else {
      res.statusCode = 404;
      res.end();
    }
  } else if (req.method === "DELETE" && items[2] === "persons" && items.length === 4) {
    // DELETE /api/persons/:id
    const requestedId = parseInt(items[3]);
    people = people.filter((person) => person.id !== requestedId);
    
    res.statusCode = 204;
    res.end();
  } else if (req.method === "POST" && items[2] === "persons") {
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      console.log(data);
      people.push({
        id: +(new Date().getTime().toString() + Math.floor(Math.random()*1000000)),
        ...data // Dont do this at home
      })
    })

    req.pipe(res);
    // Kallar vi på res.end() får vi felet: "ERR_STREAM_WRITE_AFTER_END"
    // Dvs att vi avslutar innan den vi skrivit till Writeablestreamen (res)
    //res.end();
  } else if (req.method === "PUT" && items[2] === "persons" && items.length === 4) {
    // PUT /api/persons/:id - Ersätter hela resursen
    const requestedId = parseInt(items[3]);
    const personIndex = people.findIndex(person => person.id === requestedId);

    req.on("data", (chunk) => {
      people[personIndex] = JSON.parse(chunk);
    })
    res.statusCode = 200;
    res.end();
  } else if (req.method === "PATCH" && items[2] === "persons" && items.length === 4) {
    // PATCH /api/persons/:id - Ersätter delvis resursen
    const requestedId = parseInt(items[3]);
    const personIndex = people.findIndex(person => person.id === requestedId);

    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      let person = people[personIndex];

      if (data.name) {
        person.name = data.name;
      }
      if (data.number) {
        person.number = data.number;
      }

      people[personIndex] = person;
      /*people[personIndex] = {
        ...people[personIndex],
        ...JSON.parse(chunk)
      };*/
    })
    res.statusCode = 200;
    res.end();
  }
})

app.listen(3000, () => {
  console.log("Applikationen körs på port 3000");
})