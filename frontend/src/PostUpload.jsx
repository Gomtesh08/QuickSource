


import React, { useState } from 'react';
import Navbar from './Navbar';
import './PostUpload.css';
import axiosInstance from './axiosInstance'; 
import { v4 as uuidv4 } from 'uuid';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';

const PostUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert('Please add a thumbnail');
    }

    // Generate a unique name for the image
    const imageFileName = `${image.name}_${uuidv4()}`;
    setImageName(imageFileName);
    const imageRef = ref(storage, `images/${imageFileName}`);

    try {
      
      await uploadBytes(imageRef, image);

     
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('linkInput', linkInput);
      formData.append('imageName', imageFileName); 

     
      const response = await axiosInstance.post('/quicksource/uploadpost', formData);

      if (response.status === 201) {
        alert('Post uploaded successfully!');
        setTitle('');
        setDescription('');
        setCategory('');
        setLinkInput('');
        setImage(null);
        setUploadSuccess(true); 
      } else {
        alert('Failed to upload post.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while uploading the post.');
    }
  };

  return (
    <div className='postUploadContainer'>
      <div className='navbarContainer'>
        <Navbar />
      </div>
      <hr />
      <div className='postUploadContent'>
        <div className='titleUploadPost'>
          <h1>Upload Post</h1>
        </div>
        <div className='formDiv'>
          <form className='formElements' onSubmit={handleSubmit}>
            <label htmlFor='title'>Title :</label>
            <input
              type='text'
              className='title'
              placeholder='Title....'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor='image'>Thumbnail :</label>
            <input
              type='file'
              accept='image/*'
              className='image'
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <label htmlFor='linkInput'>URL:</label>
            <input
              type='url'
              name='linkInput'
              required
              placeholder='URL...'
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
            />

            <label htmlFor='description'>Description:</label>
            <textarea
              className='description'
              placeholder='Description....'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <label htmlFor='select'>Category :</label>
            <select
              name='select'
              id=''
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Select Category</option>
              <option value='frontend'>Frontend</option>
              <option value='backend'>Backend</option>
            </select>

            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
