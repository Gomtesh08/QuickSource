// import express from 'express';
// import Upload from '../Models/Uploads.models.js'; // Adjust path as needed
// import authenticateToken from '../MiddleWare/auth.js';

// const router = express.Router();

// router.put('/:id', authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { fieldsToUpdate } = req.body; // Assuming fieldsToUpdate is an object with fields to update

//     // Extract fields to update (example fieldsToUpdate object)
//     const { title, description, category, linkInput, imageName } = fieldsToUpdate;

//     // Check if the post exists
//     const existingPost = await Upload.findById(id);
//     if (!existingPost) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Check if the authenticated user is the owner of the post
//     const { username } = req.user;
//     if (existingPost.username !== username) {
//       return res.status(403).json({ error: 'Unauthorized' });
//     }

//     // Update post fields if provided in the request body
//     if (title) existingPost.title = title;
//     if (description) existingPost.description = description;
//     if (category) existingPost.category = category;
//     if (linkInput) existingPost.linkInput = linkInput;
//     if (imageName) existingPost.imageName = imageName;

//     // Save updated post
//     await existingPost.save();

//     res.status(200).json(existingPost);
//   } catch (error) {
//     console.error('Error updating post fields:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;

import express from 'express';
import Upload from '../Models/Uploads.models.js'; // Adjust path as needed
import authenticateToken from '../MiddleWare/auth.js';

const editRouter = express.Router();

editRouter.post('/', authenticateToken, async (req, res) => {
  try {
   
    const { title, description, category, linkInput, imageName , id} = req.body;

    // Find the existing post by ID
    const existingPost = await Upload.findById(id);
    console.log(id);
    console.log(existingPost);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update fields if provided
    if (title) existingPost.title = title;
    if (description) existingPost.description = description;
    if (category) existingPost.category = category;
    if (linkInput) existingPost.linkInput = linkInput;
    if (imageName) existingPost.imageName = imageName; // Handle image name as needed

    // Save updated post
    await existingPost.save();

    res.status(200).json(existingPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default editRouter;
