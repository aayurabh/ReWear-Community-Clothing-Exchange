import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../services/auth"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }
  try {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    navigate('/dashboard');
  } catch (error) {
    alert(error.message || "Login failed");
  }
};
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
