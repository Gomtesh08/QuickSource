// SignUpForm.jsx

import React, { useState } from 'react';
import './SignUp.css'; // Import your CSS file for styling
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send data to server or perform validation)
    
  try {
    
    const response = await axios.post('/quicksource/signup',formData, {
      headers: {
        'Content-Type': 'application/json', // Set content type for FormData
      },
    })
    if(response.status == 201)
      {
         
      alert('User registered successfully!');  
      

       
      window.location.href='/signin';
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
  
      }else{
         alert('Something went Wrong')
      }


  } catch (error) {
          console.error("Error : ",error);
          alert('An error occurred while sending data or there might be chance of existing username')
  }
    

  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
