<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
=======
import { useState } from "react";

function App() {
  const a = 5;
  let message;

  const [count, setCount] = useState(0);

  const students = ["Anne", "Bob", "Charlie"];

  const [task, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if(input.trim() === "") return;
    setTasks([...task, input]);
    setInput("");
  }

  const isLoggedIn = true;
  if (isLoggedIn)
      {
       message = "Welcome back!"
      }
      else
      {
        message = "Please Login!"
      }
      <p>{message}</p>

  return (

    <div>
      <h1> Hello, React!</h1>
      <p>a is equal to {a}</p>
      
      <h2>{a > 5 ? "Welcome" : "Please Login."}</h2>

      <p>Count: {count}</p>
      <button onClick = {() => setCount(count + 1)}>
        Increase
      </button>
      <button onClick = {() => setCount(count - 1)}>
      Decrease
      </button>
      <button onClick = {() => setCount(0)}>
      Reset
      </button>

      <ul>
        {students.map((students, index) => (<li key={index}>{students}</li>))}
      </ul>

    </div>
    
  );
  
}


export default App;
>>>>>>> e28c9b69f04d4a3670260f0503e510bd93f06c26
