import axios from '../api/axios';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', { email, password });
      const token = res.data.accessToken;

      // Save token to localStorage
      localStorage.setItem('token', token);
      alert('Login successful');
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
