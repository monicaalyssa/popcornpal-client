export const LoginView = () => {
  return (
    <div className="login-container">
      <form className="login-form-flexbox">
        <h2 className="login-heading">Log In</h2>
        <div className="form-labels-container">
          <label className="form-label-box">
            <p>Username</p>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-box"
            />
          </label>
          <label className="form-label-box">
            <p>Password</p>
            <input
              placeholder="Enter your password"
              className="input-box password-input"
              type="password"
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
