
import React, { useEffect, useState } from 'react';
import axiosInstance2 from './axiosIntance2';
import Navbar from './Navbar';
import './UserPosts.css'; 
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        
        const response = await axiosInstance2.post('/quicksource/getuserposts'); 
        const posts = response.data;

       
        const imageList = await listAll(ref(storage, 'images/'));
        const imageUrls = await Promise.all(
          imageList.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );

      
        const imageMap = imageUrls.reduce((acc, { name, url }) => {
          acc[name] = url;
          return acc;
        }, {});
        
        setImages(imageMap);
        setUserPosts(posts);
      } catch (err) {
        setError('Error fetching user posts.');
        console.error('Error fetching user posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []); 

  const handleSubmit = (postId) => {
    localStorage.setItem('id', postId);
    window.location.href = '/editpost';
  };

  if (loading) {
    return <p>Loading user posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />

      <div className='container'>
      <div className='userPostsContainer'>
       <div className='headTitle'>
       <h1>Your Posts</h1>
       </div>
        {userPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className="post">
              <div className="post-img">
                <img src={images[post.imageName]} className="post-image" alt="Post" />
                <i className="fas fa-heart"></i>
              </div>
        
              <div className="caption">
                <div className="post-cap">
                   <div>
                     <h2> Title :   {post.title}</h2>
                   </div>
                 
                   <div>

                  <h3> Description :  {post.description}</h3>

                   </div>
                  <div>
                  <a href={post.linkInput}>Link</a>
                  </div>
                </div>
              </div>
              
              <div className="react-detail">
                {post.likes} likes
              </div>
              
              <div className="buttons">
                <button onClick={() => handleSubmit(post._id)}>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default UserPosts;
