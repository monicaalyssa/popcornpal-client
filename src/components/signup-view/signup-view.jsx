import { userState, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { Link } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://popcornpal-32d285ffbdf8.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = "/login";
        
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form-flexbox">
        <h2 className="login-heading">Sign Up</h2>
        <div className="form-labels-container">
          <label className="form-label-box">
            <p>Username</p>
            <input
              className="input-box"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </label>
          <label className="form-label-box">
            <p>Password</p>
            <input
              className="input-box password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="form-label-box">
            <p>Email</p>
            <input
              className="input-box"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form-label-box">
            <p>Birthday</p>
            <input
              className="input-box birthday-input"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="login-button-container">
        <button className="login-button" type="submit">
          Sign Up
        </button>
        <p className="login-signup-redirect">Already have an account? <Link className="redirect-link" to={`/login`}>Log In</Link></p>
        </div>
      </form>
    </div>
  );
};
