import React from 'react';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
