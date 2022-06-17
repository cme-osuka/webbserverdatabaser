import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

let socket;

function App() {
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket = io("https://strengthened-decisive-caboc.glitch.me/");

    socket.on("connect", () => {
      console.log("Ansluten till servern");
    })

    socket.on("message", (data) => {
      console.log(data);
    })

    socket.on("new_client", (data) => {
      console.log(data);
    })

    socket.on("joined_room", (data) => {
      console.log(`${data} has joined the room`);
    })

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from server");
    })

    return () => socket.off();
  }, []);

  function handleMessage() {
    socket.emit("message", JSON.stringify({ message: "Hello Server!" }));
  }

  function handleDM() {
    socket.emit("direct_message", { message: "Hej där!", to: socketId })
  }

  function joinRoom(roomName) {
    socket.emit("join_room", roomName)
  }

  function leaveRoom(roomName) {
    socket.emit("leave_room", roomName);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input name="socketId" value={socketId} onChange={event => setSocketId(event.target.value)} />
        <button onClick={handleDM}>Skicka direktmeddelande</button>

        <button onClick={handleMessage}>Skicka meddelande</button>

        <button onClick={() => joinRoom("piri room")}>Gå med i rum</button>
        <button onClick={() => leaveRoom("piri room")}>Lämna rum</button>
      </header>
    </div>
  );
}

export default App;
