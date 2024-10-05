import React, { useState } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_BASE_API;

const Admin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/auth/login`, {
        username,
        password,
      });
      const { access_token } = response.data;

      localStorage.setItem('token', access_token);

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className={styles.admin}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
