
import express from 'express';
import Upload from '../Models/Uploads.models.js'; // Adjust path as needed
import authenticateToken from '../MiddleWare/auth.js';
const router = express.Router();



router.post('/',authenticateToken , async (req, res) => {
  try {
    const { title, description, category, linkInput , imageName} = req.body;
    const likes =  0 ;
    const { username } = req.user;

    // console.log(username) ;

    if (!title || !description || !category || !linkInput || !imageName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    //  console.log(imageName);
    const newPost = new Upload({ title, description, category,linkInput,username,imageName,likes});
    await newPost.save();
  
     
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router 