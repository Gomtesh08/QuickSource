import express from 'express';
import Upload from '../Models/Uploads.models.js'; // Adjust path as needed
import authenticateToken from '../MiddleWare/auth.js';
const finddataRoute = express.Router();

finddataRoute.post('/',authenticateToken, async (req, res) => {
  try {
    const { keywordsFound } = req.body;

    console.log(keywordsFound);

    if (!keywordsFound || !Array.isArray(keywordsFound) || keywordsFound.length === 0) {
      return res.status(400).json({ error: 'Keywords array is required and must not be empty' });
    }

 

    

    const data = await Upload.find({category : { $in: keywordsFound }});

    console.log(data);

    if (data.length === 0) {
      return res.status(404).json({ error: 'No data found for the provided keywords' });
    }

    res.status(200).json({ message: 'Data found successfully', data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default finddataRoute;
