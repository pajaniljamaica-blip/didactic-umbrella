import { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  // Add using Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  // Remove Task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Drag Start
  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  // Drop
  const handleDrop = (index) => {
    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks[dragIndex];

    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(index, 0, draggedItem);

    setTasks(updatedTasks);
    setDragIndex(null);
  };

 return (
  <div className="page">
    <div className="todo-container">
      <h2>My To-Do List</h2>

      <div className="input-row">
        <input
          type="text"
          value={input}
          placeholder="Enter a Task"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className="task-item"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <span
              className={`task-text ${
                task.completed ? "completed" : ""
              }`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>

            <button
              className="delete-btn"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default ToDoList;
