import { useState, useEffect } from 'react'
import './App.css'

import axios from "axios";

function App() {
  const [students, setStudents] = useState([])

  const getStudents = async () => {
    const { data } = await axios.get("http://localhost:4000/");
    setStudents(data);
  }

  const addStudent = async () => {
    await axios.post("http://localhost:4000", "Joakim");
  }

  useEffect(() => {
    getStudents();
  }, [])


  return (
    <div className="App">
      <header className="App-header">

        {students.map((student) => (
          <p>{student}</p>
        ))}
        
        <p>
          <button type="button" onClick={addStudent}>
            Lägg till elev
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
