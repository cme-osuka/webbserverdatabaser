
function encrypt(data) {
  return "krypterad data";
}

function send(url, data) {
  const encryptedData = encrypt(data);

  console.log(`Skickat ${encryptedData} till ${url}`);

  return "responsen från servern";
}

module.exports = {
  send,
}

//console.log("Hej från Request.js");