


import React, { useState, useEffect } from 'react';
import axiosInstance2 from './axiosIntance2';
import { FaThumbsUp } from 'react-icons/fa'; 

const PostActions = ({ postId, initialLikes, currentUser }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(initialLikes || 0); 
    setLiked(initialLikes > 0);  
  }, [initialLikes]);

  const handleLike = async () => {
    try {
      const response = await axiosInstance2.post('/quicksource/like', { postId });

      if (response.status === 200) {
        setLikes(response.data.likes);  
        setLiked(response.data.likedBy.includes(currentUser)); 
        localStorage.setItem(`likes-${postId}`, response.data.likes);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  useEffect(() => {
   
    const storedLikes = localStorage.getItem(`likes-${postId}`);
    if (storedLikes !== null) {
      setLikes(parseInt(storedLikes)); 
    }
  }, [postId]);

  return (
    <div className="post-actions">
    
      <FaThumbsUp
        style={{ cursor: 'pointer', color: liked ? 'blue' : 'inherit' }} 
        onClick={handleLike} 
      />
    
      <span>Likes : ({likes})</span>
    </div>
  );
};

export default PostActions;
