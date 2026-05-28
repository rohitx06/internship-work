import React, { useState, useEffect } from "react";

import "./App.css";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/list-todo.svg";
import doingIcon from "./assets/doing.svg";
import doneIcon from "./assets/done.svg";

const getStoredTasks = () => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Failed to parse tasks from localStorage", error);
    return [];
  }
};

const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  } catch (error) {
    console.error("Failed to retrieve authentication status", error);
    return false;
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);
  const [tasks, setTasks] = useState(getStoredTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }


  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const handleStatusChange = (taskIndex, newStatus) => {
    const newTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, status: newStatus } : task,
    );
    setTasks(newTasks);
  };
  return (
    <div className="app">
      <header className="app_header_with_logout">
        <TaskForm setTasks={setTasks} />
        <button className="logout_button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="app_main">
        <TaskColumn
          title="To do"
          icon={todoIcon}
          tasks={tasks}
          status="todo"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="Doing"
          icon={doingIcon}
          tasks={tasks}
          status="doing"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
        <TaskColumn
          title="Done"
          icon={doneIcon}
          tasks={tasks}
          status="done"
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
};

export default App;
