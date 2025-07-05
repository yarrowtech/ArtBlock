// src/pages/AuthPage.js

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/AuthPage.module.css';

const AuthPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');

  const [isRegistering, setIsRegistering] = useState(mode !== 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const API = 'http://localhost:5000/api/auth';

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAction = async () => {
    try {
      setError('');
      setIsLoading(true);

      if (!isValidEmail(email)) throw new Error('Please enter a valid email.');
      if (!password) throw new Error('Password cannot be empty.');

      if (isRegistering) {
        if (!username) throw new Error('Username is required.');
        if (!role) throw new Error('Please select a role.');

        const res = await fetch(`${API}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, role }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed.');

        setIsRegistering(false);
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('');
        alert('Registration successful! Please log in.');
      } else {
        const res = await fetch(`${API}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed.');

        const user = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);

        if (user.role === 'creator') {
          navigate(`/creatorprofile/${user.id}`); // 🔥 Dynamic redirect
        } else {
          navigate('/feed');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <div className={styles.formSection}>
          <h2 className={styles.title}>
            {isRegistering ? 'Registration' : 'Login'}
          </h2>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            {isRegistering && (
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Username"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputWrapper}>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {isRegistering && (
              <div className={styles.inputWrapper}>
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.input}
                  disabled={isLoading}
                >
                  <option value="">Select Role</option>
                  <option value="creator">Creator</option>
                  <option value="supporter">Supporter</option>
                </select>
              </div>
            )}
          </div>

          <button
            className={`${styles.actionButton} ${
              isLoading ? styles.loading : ''
            }`}
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading
              ? 'Please wait...'
              : isRegistering
              ? 'Register'
              : 'Login'}
          </button>
        </div>

        <div className={styles.toggleSection}>
          <h2 className={styles.toggleTitle}>
            {isRegistering ? 'Welcome Back!' : 'Hello, Welcome!'}
          </h2>
          <p className={styles.toggleText}>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
            className={styles.toggleButton}
            disabled={isLoading}
          >
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
