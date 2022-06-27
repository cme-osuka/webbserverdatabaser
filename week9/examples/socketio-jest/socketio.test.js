const ioClient = require("socket.io-client");
const ioServer = require("socket.io");

let socket; // klient-instansen
let io; // server-instansen
let ioSocket;

// Livscykel-metoder, setup-funktioner
// En gång, före tester körs
beforeAll((done) => {
  io = new ioServer.Server(4000);
  io.on("connection", (socket) => {
    ioSocket = socket;
  })
  done();
})

afterAll((done) => {
  //io.close();
  done();
})

beforeEach((done) => {
  socket = ioClient.connect("http://localhost:4000", {
    reconnectionDelay: 0,
    "reopen delay": 0,
    forceNew: true
  });
  socket.on("connect", () => {
    done();
  })
})

afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

test("event:echo works", (done) => {
  // Server
  io.emit("echo", "Hello World");
  // Klient
  socket.once("echo", (message) => {
    expect(message).toBe("Hello World");
    expect(message).not.toBe("Goodbye World");
    done();
  })
})

test("event:join_room works", (done) => {
  ioSocket.on("join_room", (roomName) => {
    expect(roomName).toBeDefined();
    done();
  })
  socket.emit("join_room", "Rumnamn");
})