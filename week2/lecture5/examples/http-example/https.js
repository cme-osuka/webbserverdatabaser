//const { send } = require("./request");
//const { read } = require("./response");
const { request, response } = require("./internals");
/*import { send } from "./request.mjs";
import { read } from "./response.mjs";*/



function makeRequest(url, data) {
  const res = request.send(url, data);
  const result = response.read(res);
  console.log(result);
}

makeRequest("http://google.se", "Lite data");