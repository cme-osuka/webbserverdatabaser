import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState({});

  const usersList = Object.keys(users);

  useEffect(() => {
    const username = prompt("What's your name?");

    // Skicka ditt användarnamn till servern
    // med eventet som finns definierat i backenden
    
    // Även i useEffect som du kallar på io() för att
    // sätta upp en anslutning till servern och 
    // dina event-lyssnare.

    // Glöm inte cleanup-funktionen!
    // (Hur detta skrivs i React finns under examples i dokumentationen)
    // https://socket.io/docs/v4/
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {usersList.map((userId) => (
          <p key={userId}>{users[userId]}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
