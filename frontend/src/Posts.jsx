

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './Posts.css'; 
import PostActions from './PostActions';
import axiosInstance2 from './axiosIntance2';
import { FaThumbsUp, FaBookmark } from 'react-icons/fa'; 

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({}); 
  const [postid, setPostId] = useState('');

  const imagesRef = ref(storage, 'images/');

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const imageList = await listAll(imagesRef);
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

       
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.data && Array.isArray(parsedData.data)) {
            
            const sortedPosts = parsedData.data.sort((a, b) => {
              if (a.likes !== b.likes) {
                return b.likes - a.likes; // Sort by likes in descending order
              } else {
                return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
              }
            });
            setPostsData(sortedPosts);
          } else {
            console.error('Stored data is not in expected format:', parsedData);
          }
        } else {
          console.error('No data found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleSave = async (PostId) => {
    try {
      console.log(PostId);
      const response = await axiosInstance2.post('/quicksource/savepost', { PostId });

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert('Post is not Saved Successfully!');
      }
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='postscontainer'>
      <div className='headTitle'>
       <h1>Search Result</h1>
       </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='posts-list'>
            {postsData.map((post) => (
              <div key={post._id} className='post'>
                <img src={images[post.imageName]} className='post-image' alt='Post' />
                <div className='post-details'>
                  <h3 className='post-title'>{post.title}</h3>
                  <p className='post-description'>{post.description}</p>
                  <p> Created By {post.username}</p>
                  <a href={post.linkInput} className='post-link'>
                    Link
                  </a>
                </div>
                <PostActions postId={post._id} initialLikes={post.likes} />
                <div className='post-actions'>
                 
                  <FaBookmark
                    style={{ cursor: 'pointer'}}
                    onClick={() => handleSave(post._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;

