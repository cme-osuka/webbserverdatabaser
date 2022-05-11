const fs = require("fs");
const { parse } = require("csv-parse");

/*
  "2019-12-31": {
    highest: 0,
    lowest: 0,
    noData: 0
  }
*/
const days = {}
let highest = 0;
let lowest = 100;

fs.createReadStream("BirkakorsetData.csv", "utf-8")
.pipe(parse({ delimiter: ";" }))
.on("data", (chunk) => {
  const day = chunk[0].split(" ")[0];
  const value = parseFloat(chunk[2]);

  if (!days[day]) {
    days[day] = {
      highest: 0,
      lowest: 100,
      noData: 0
    }
  }

  if (Number.isNaN(value)) {
    days[day].noData++
  }

  if (value > days[day].highest) {
    days[day].highest = value;
  }

  if (value > 0 && value < days[day].lowest) {
    days[day].lowest = value;
  }

  if (value > highest) {
    highest = value;
  }

  if (value < lowest) {
    lowest = value;
  }
})
.on("end", () => {
  console.log(`Amount of days ${Object.keys(days).length}`)
  console.log(`Highest value ${highest}`);
  console.log(`Lowest value ${lowest}`);
  console.log("Läst färdigt filen")
})