// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const LoginPage = () => {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validate email and password (basic validation for example)
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Store email and password in localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirect to home or dashboard page after login
    history('/home'); // Replace with your desired route
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <button type="button" onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
