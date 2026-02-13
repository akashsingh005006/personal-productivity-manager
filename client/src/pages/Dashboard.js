import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const token = localStorage.getItem("token");

  // Logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks?search=${search}&priority=${filterPriority}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
    } catch {
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      fetchTasks();
    } catch {
      alert("Error creating task");
    }
  };

  // Toggle Complete
  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  return (
    <div className="container">
      <h2 className="title">My Tasks</h2>

      {/* Add Task Form */}
      <form onSubmit={submitHandler} className="form">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Priority: Low</option>
          <option value="medium">Priority: Medium</option>
          <option value="high">Priority: High</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {/* Search + Filter */}
      <div className="search-bar">
        <input
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            fetchTasks();
          }}
        />

        <select
          value={filterPriority}
          onChange={(e) => {
            setFilterPriority(e.target.value);
            fetchTasks();
          }}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task">
            <span className="task-title">{task.title}</span>

            <span className={`priority ${task.priority}`}>
              {task.priority}
            </span>

            <span className="status">
              {task.completed ? "Completed" : "Pending"}
            </span>

            <div className="actions">
              <button
                className="complete-btn"
                onClick={() =>
                  toggleComplete(task._id, task.completed)
                }
              >
                ✓
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
