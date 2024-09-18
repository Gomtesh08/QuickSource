
import React, { useState } from 'react';
import Navbar from './Navbar';
import './PostUpload.css';
import axiosInstance from './axiosInstance'; 
import { useParams } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';

const PostUpload = () => {
  const  id  = localStorage.getItem('id'); 
  console.log(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [linkInput, setLinkInput] = useState('');
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     

      const formData = new FormData();
      
      if(image)
        {
           console.log(image)
          const imageFileName = `${image.name}_${uuidv4()}`;
      const imageRef = ref(storage, `images/${imageFileName}`);

     
      await uploadBytes(imageRef, image);
       alert("Image Uploaded SuccessFully !");  
      
     
      
    
      
      if(imageFileName)formData.append('imageName', imageFileName); 
     

        }
        if(title)  formData.append('title', title);
        if(description)  formData.append('description', description);
        if(category) formData.append('category', category);
        if(linkInput)formData.append('linkInput', linkInput);
        if(id)formData.append('id', id);

     
      const response = await axiosInstance.post(`/quicksource/editpost`, formData);

        
      if (response.status === 200) {
        alert('Post updated successfully!');
        setTitle('');
        setDescription('');
        setCategory('');
        setLinkInput('');
        setImage(null);
        setUploadSuccess(true); 
      } else {
        alert('Failed to update post.');
      }

    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while updating the post.');
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
          <h1>Edit Post</h1>
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
              
            />

            <label htmlFor='image'>Thumbnail :</label>
            <input
              type='file'
              accept='image/*'
              className='image'
              onChange={(e) => setImage(e.target.files[0])}
             
            />

            <label htmlFor='linkInput'>URL:</label>
            <input
              type='url'
              name='linkInput'
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
              
            ></textarea>

            <label htmlFor='select'>Category :</label>
            <select
              name='select'
              id=''
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            
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
