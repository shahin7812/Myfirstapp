import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    // Simple local auth (for demo)
    const userKey = `user_${username}`;
    if (isSignup) {
      if (localStorage.getItem(userKey)) {
        setError('User already exists');
        return;
      }
      localStorage.setItem(userKey, password);
      onLogin(username);
    } else {
      const stored = localStorage.getItem(userKey);
      if (stored === password) {
        onLogin(username);
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <section id="auth">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={() => setIsSignup(s => !s)}>
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </section>
  );
}

export default Auth;
