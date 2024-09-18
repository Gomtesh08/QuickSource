
import React, { useState } from 'react';
import './Signin.css'; // Import your CSS file for styling
import axios from 'axios';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/quicksource/signin', { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Logged in Successfully');
        setUsername('');
        setPassword('');

       
        localStorage.setItem('token', response.data.token);

     
        window.location.href = '/hero';
      } else if (response.status === 401) {
        alert('Invalid credentials');
      } else if (response.status === 404) {
        alert('User not found');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing in');
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
