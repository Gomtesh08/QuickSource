

import React, { useEffect, useState } from 'react';
import axiosInstance2 from './axiosIntance2';
import Navbar from './Navbar'; 
import './UserPosts.css';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
       
        const response = await axiosInstance2.post('/quicksource/getsavedposts'); 
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
     
        }
        , {});
       console.log(imageMap);
        setImages(imageMap);
       
        setUserPosts(posts);
      } catch (err) {
       
        console.error('Error fetching user posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return <p>Loading user posts...</p>;
  }

const unsaveHandler = async(PostId)=>{

    try {
         
   const unsaveResponse = await axiosInstance2.post('/quicksource/unsavepost',{PostId});

    if(unsaveResponse.status == 200)
      {
          alert(unsaveResponse.data.message);
          setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== PostId));
      }

    } catch (error) {
        console.error("Error : ",error);
    }


} 

  return (
    <div>
      <Navbar />
      <div className='userPostsContainer'>
      <div className='headTitle'>
       <h1>Saved Posts</h1>
       </div>
        {userPosts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          userPosts.map((post) => (
            <div key={post._id} className="post">
              <h2>Title : {post.title}</h2>
              <img src={images[post.imageName]} className="post-image" alt="Post" />
              <p>Description : {post.description}</p>
              <p>Category : {post.category}</p>
              <a href={post.linkInput}>Link </a>
              <p>Likes : {post.likes}</p>
              <button onClick={()=> unsaveHandler(post._id)}>Unsave</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPosts;
