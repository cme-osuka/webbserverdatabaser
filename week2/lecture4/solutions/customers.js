const fs = require("fs");

const customer = {
  name: process.argv[2],
  address: process.argv[3]
}

fs.readFile("./customers.json", (err, data) => {
  if (err) throw err; 

  const parsedJson = JSON.parse(data); 
  parsedJson.customers.push(customer)

  const stringifiedJson = JSON.stringify(parsedJson, null, 2);

  fs.writeFile("./customers.json", stringifiedJson, (err) => {
    if (err) throw err;
    console.log("Wrote to customers.json");  
  })
})