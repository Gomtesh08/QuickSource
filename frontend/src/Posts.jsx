import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './Posts.css';
import PostActions from './PostActions';
import axiosInstance2 from './axiosIntance2';
import { FaBookmark } from 'react-icons/fa';

const Posts = () => {
  const [postsData, setPostsData] = useState([]); 
  const [loading, setLoading] = useState(true);   
  const [images, setImages] = useState({});      
  const imagesRef = ref(storage, 'images/');      

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch images from Firebase Storage
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(
          imageList.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );

        // Map image names to their URLs
        const imageMap = imageUrls.reduce((acc, { name, url }) => {
          acc[name] = url;
          return acc;
        }, {});
        setImages(imageMap); // Set the images state

        // Fetch post data from localStorage
        const storedData = localStorage.getItem('postsData'); // Add this line
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          console.log("Fetched Posts:", parsedData);

          if (parsedData.data && Array.isArray(parsedData.data)) {
            // Sort the posts by likes and creation date
            const sortedPosts = parsedData.data.sort((a, b) => {
              if (a.likes !== b.likes) {
                return b.likes - a.likes; // Sort by likes (descending)
              } else {
                return new Date(b.createdAt) - new Date(a.createdAt); // Sort by date (descending)
              }
            });
            setPostsData(sortedPosts); // Set sorted post data
          } else {
            console.error('Stored data is not in expected format:', parsedData);
          }
        } else {
          console.error('No data found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchData();
  }, []);

  // Save post by postId
  const handleSave = async (postId) => {
    try {
      console.log("Saving Post ID:", postId);
      const response = await axiosInstance2.post('/quicksource/savepost', { postId });

      if (response.status === 200) {
        alert(response.data.message);
      } else {
        alert('Post is not Saved Successfully!');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="postscontainer">
        <div className="headTitle">
          <h1>Search Results</h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          postsData.length === 0 ? (
            <p>No posts available.</p> // Message if no posts are found
          ) : (
            <div className="posts-list">
              {postsData.map((post) => (
                <div key={post._id} className="post">
                  <img 
                    src={images[post.imageName]} 
                    className="post-image" 
                    alt="Post" 
                  />
                  <div className="post-details">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                    <p>Created by {post.username}</p>
                    <a href={post.linkInput} className="post-link">
                      Link
                    </a>
                  </div>
                  <PostActions postId={post._id} initialLikes={post.likes} />
                  <div className="post-actions">
                    <FaBookmark
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSave(post._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
