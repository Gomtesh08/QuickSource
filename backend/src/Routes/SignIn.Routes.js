

import express from 'express';
import SignUp from '../Models/SignUp.Models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signInRoute = express.Router();

signInRoute.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await SignUp.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

   
    const token = jwt.sign(
      { userId: existingUser._id, username: existingUser.username },
      `${process.env.secret_key}`,
      { expiresIn: '1h' } 
    );

    console.log(token);

 
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default signInRoute;
