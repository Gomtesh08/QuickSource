

import express from 'express';
import path from 'path';
import fs from 'fs';

const imageRoute = express.Router();
const __dirname = path.resolve();

const imagesDirectory = path.join(__dirname, 'Images');
imageRoute.use('/images', express.static(imagesDirectory));


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
