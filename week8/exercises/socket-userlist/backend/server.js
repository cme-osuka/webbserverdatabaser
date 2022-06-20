const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const usernames = {};

io.on("connection", (socket) => {

  socket.on("new_user", (username) => {
    // Lägg till användarnamnet i usernames
    
    // Lägger till användarnamnet så du kan komma åt det i 
    // socket-objektet. Testa console.logga det i disconnect, till exempel
    socket.username = username;
    // Skickar det uppdaterade objektet usernames till alla ansluta klienter
    io.sockets.emit("updated_users", usernames);
  })
  
  socket.on("disconnect", () => {
    // Ta bort användarnamnet i usernames

    // Skickar det uppdaterade objektet usernames till alla ansluta klienter
    io.sockets.emit("updated_users", usernames);
  });
});

io.listen(4000);
