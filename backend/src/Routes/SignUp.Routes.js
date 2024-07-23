import express from 'express';
import SignUp from '../Models/SignUp.Models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signUpRoute = express.Router();

signUpRoute.post('/', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await SignUp.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new SignUp({ username, email, password: hashedPassword });

    // Save new user
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
       `${process.env.secret_key}`,
      { expiresIn: '1h' } // Token expires in 1 hour
    );


    

    // Send the token in response
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default signUpRoute;
