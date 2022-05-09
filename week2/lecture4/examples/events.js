const EventEmitter = require("events");

const influencerEmitter = new EventEmitter();

process.on("exit", (code) => {
  console.log(`Applikationen håller på att avslutas med kod: ${code}`)
})

influencerEmitter.on("content", (data) => {
  console.log(`Detta är den bästa ${data.type} någonsin!`);
})

influencerEmitter.on("content", (data) => {
  if (data.type === "video") {
    console.log(`Min ${data.type} är bättre än din`);    
  }
})

influencerEmitter.emit("content", {
  type: "bloggpost",
  url: "https://youtube.com/watch?=1238hhru72"
});