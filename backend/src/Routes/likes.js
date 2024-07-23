// import express from 'express';
// import Upload from '../Models/Uploads.models.js'; // Adjust the path as necessary

// const likeRouter = express.Router();

// likeRouter.post('/', async (req, res) => {
//   const { postId, likes, dislikes, difference } = req.body;

//   try {
//     const post = await Upload.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     post.likes = likes;
//     post.dislikes = dislikes;
//     post.difference = difference;

//     await post.save();

//     res.status(200).json(post);
//   } catch (error) {
//     console.error('Error updating likes:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default likeRouter;
import express from 'express';
import Upload from '../Models/Uploads.models.js';
import authenticateToken from '../MiddleWare/auth.js';
const likeRouter = express.Router();

likeRouter.post('/', authenticateToken ,async (req, res) => {
  const { postId } = req.body;
  const {username} = req.user ;

  try {
    const post = await Upload.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likedBy.includes(username);

    if (alreadyLiked) {
      // Remove user from liked list
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((name) => name !== username);
    } else {
      // Add user to liked list
      post.likes += 1;
      post.likedBy.push(username);

      // If user disliked the post before, remove from disliked list
     
    }

    post.difference = post.likes - post.dislikes;

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error('Error updating likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default likeRouter;
