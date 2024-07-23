import express from 'express';
import authenticateToken from '../MiddleWare/auth.js';
import Upload from '../Models/Uploads.models.js';

const userPosts = express.Router();

userPosts.post('/', authenticateToken, async (req, res) => {
  try {
    const { username } = req.user;

    // Fetch posts created by the authenticated user
    const userPosts = await Upload.find({ username });

    // Send the fetched posts as a response
    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userPosts;
