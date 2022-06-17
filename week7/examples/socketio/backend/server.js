const { Server } = require("socket.io");

// Vi lägger till CORS-regler och tillåter alla origins ("*")
// eftersom socket.io BÖRJAR med http/https och sedan uppgraderar
// till en websocket-anslutning.
// https://socket.io/docs/v4/handling-cors/#configuration
// https://socket.io/docs/v4/how-it-works/#upgrade-mechanism
const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`Socket med id't ${socket.id} har anslutit`)

  // Rooms
  // https://socket.io/docs/v4/rooms/
  socket.on("join_room", (data) => {
    // data: string med rumnamnet
    console.log(`${socket.id} has joined ${data}`)

    // Gå med i ett rum
    socket.join(data);

    // Berättar för alla i rummet som lyssnar på "joined_room"
    // att socketen med detta id't har gått med
    io.to(data).emit("joined_room", socket.id);

    // Skriver ut rummen socketen är med i
    console.log(socket.rooms);
  })

  socket.on("leave_room", (data) => {
    // data: string med rumnamnet
    console.log(`${socket.id} has left room ${data}`)
    
    // Lämnar ett rum
    socket.leave(data);

    // Skriver sedan ut vilka rum socketen är med i efteråt
    console.log(socket.rooms);
  })

  // io = serverobjektet
  // och io.emit emittar till ALLA sockets på servern
  io.emit("new_client", "A new client has joined");

  socket.on("message", (data) => {
    console.log(`${socket.id} har skickat ${data}`)
    // Broadcast: Skickar till alla utom den som skickade eventet
    // "message"
    socket.broadcast.emit("message", data)
  })

  // data: { message: "", to: "" }
  socket.on("direct_message", (data) => {
    // socket.to(<rumnamn>) gör att vi kan skicka ett
    // meddelande till ett specifikt rum, även om vi inte
    // är med i det. 
    // Går att använda för att skicka ett direktmeddelande till
    // någon, eftersom när användaren ansluter till servern
    // skapas det ett rum med den socketens id som namn.
    socket.to(data.to).emit("message", data.message)
  })

  // När en socket disconnectar, skriver vi ut anledningen
  // (transport closed = tabben stängdes, eller anslutningen stängdes)
  socket.on("disconnect", (reason) => {
    console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`)
  })
})

io.listen(4000);