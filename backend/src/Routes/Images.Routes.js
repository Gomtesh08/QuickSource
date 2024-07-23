// Backend (Express) - imageRoute configuration
// Assuming this is in your Images.Routes.js or equivalent file

import express from 'express';
import path from 'path';
import fs from 'fs';

const imageRoute = express.Router();
const __dirname = path.resolve();

// Serve images from a directory
const imagesDirectory = path.join(__dirname, 'Images');
imageRoute.use('/images', express.static(imagesDirectory));

// Endpoint to fetch all image names
imageRoute.get('/', (req, res) => {
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading images directory:', err);
      return res.status(500).json({ error: 'Failed to read images directory' });
    }
    const imageNames = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    res.json(imageNames);
  });
});

export default imageRoute;
