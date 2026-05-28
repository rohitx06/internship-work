import React, { useState } from "react";

import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Invalid username or password");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <h1 className="login_title">Task Manager</h1>
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="login_input"
            />
          </div>

          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="login_input"
            />
          </div>

          {error && <div className="error_message">{error}</div>}

          <button type="submit" className="login_button">
            Login
          </button>
        </form>

        <div className="login_hint">
          <p>Demo Credentials:</p>
          <p>
            Username: <strong>admin</strong>
          </p>
          <p>
            Password: <strong>admin</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
