import express from 'express'
import authenticateToken from '../MiddleWare/auth.js'
import SavedPost from '../Models/savePost.Models.js';
import Upload from '../Models/Uploads.models.js';
import { get } from 'mongoose';
const fetchSavedPost = express.Router();

fetchSavedPost.post('/',authenticateToken,async(req,res)=>{



  try {
    
    const {username} = req.user ;
    
    
    const getSavedPosts = await SavedPost.find({savedBy : username}) ;

    if (!getSavedPosts || getSavedPosts.length === 0) {
      return res.status(404).json({ message: 'No saved posts found' });
    }

    const postIds  = getSavedPosts.map((post)=> post.PostId);

const getData = await Upload.find({ _id: { $in: postIds } });

if (!getData || getData.length === 0) {
  return res.status(404).json({ message: 'No data found for saved posts' });
}

  
      res.status(200).json(getData);



  } catch (error) {
    
    console.error("Error fetching saved posts:", error);
    res.status(500).json({ error: "Failed to fetch saved posts" });
  }

})

export default fetchSavedPost