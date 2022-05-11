const { get } = require("https");

get("https://www.google.se", (res) => {
  res.on("data", (chunk) => {
    console.log(`En chunk: ${chunk}`)
  })
  res.on("end", () => {
    console.log("Ingen mer data")
  })
})