import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    // prevents the default behavior of the page reloading when the form is submitted
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://popcornpal-32d285ffbdf8.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
        alert("Something went wrong");
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form-flexbox">
        <h2 className="login-heading">Log In</h2>
        <div className="form-labels-container">
          <label className="form-label-box">
            <p>Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="input-box"
              required
            />
          </label>
          <label className="form-label-box">
            <p>Password</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-box password-input"
              type="password"
              required
            />
          </label>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
