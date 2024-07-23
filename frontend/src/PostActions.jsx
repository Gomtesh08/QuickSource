

// import React, { useState, useEffect } from 'react';
// import axiosInstance2 from './axiosIntance2';
// import { FaThumbsUp, FaBookmark } from 'react-icons/fa'; 

// const PostActions = ({ postId, initialLikes, currentUser }) => {
//   const [likes, setLikes] = useState(initialLikes || 0);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     setLikes(initialLikes || 0); // Initialize likes state
//     setLiked(initialLikes > 0);  // Set liked state based on initialLikes
//   }, [initialLikes]);

//   const handleLike = async () => {
//     try {
//       const response = await axiosInstance2.post('/quicksource/like', { postId });

//       if (response.status === 200) {
//         setLikes(response.data.likes);  // Update likes count
//         setLiked(response.data.likedBy.includes(currentUser));  // Check if current user liked
//         // Update localStorage with the latest likes count
//         localStorage.setItem(`likes-${postId}`, response.data.likes);
//       }
//     } catch (error) {
//       console.error('Error updating like:', error);
//     }
//   };

//   useEffect(() => {
//     // Retrieve likes count from localStorage when component mounts
//     const storedLikes = localStorage.getItem(`likes-${postId}`);
//     if (storedLikes !== null) {
//       setLikes(parseInt(storedLikes));  // Parse and set likes from localStorage
//     }
//   }, [postId]);

//   return (
//     <div className="post-actions">
//       {/* <button onClick={handleLike}>({likes})</button> */}
//       <FaThumbsUp style={{ cursor: 'pointer' }} onClick={() => {handleLike}} />
//     </div>
//   );
// };

// export default PostActions;
import React, { useState, useEffect } from 'react';
import axiosInstance2 from './axiosIntance2';
import { FaThumbsUp } from 'react-icons/fa'; 

const PostActions = ({ postId, initialLikes, currentUser }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(initialLikes || 0); // Initialize likes state
    setLiked(initialLikes > 0);  // Set liked state based on initialLikes
  }, [initialLikes]);

  const handleLike = async () => {
    try {
      const response = await axiosInstance2.post('/quicksource/like', { postId });

      if (response.status === 200) {
        setLikes(response.data.likes);  // Update likes count
        setLiked(response.data.likedBy.includes(currentUser));  // Check if current user liked
        // Update localStorage with the latest likes count
        localStorage.setItem(`likes-${postId}`, response.data.likes);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  useEffect(() => {
    // Retrieve likes count from localStorage when component mounts
    const storedLikes = localStorage.getItem(`likes-${postId}`);
    if (storedLikes !== null) {
      setLikes(parseInt(storedLikes));  // Parse and set likes from localStorage
    }
  }, [postId]);

  return (
    <div className="post-actions">
      {/* Render the FaThumbsUp icon */}
      <FaThumbsUp
        style={{ cursor: 'pointer', color: liked ? 'blue' : 'inherit' }} // Conditionally set color based on liked state
        onClick={handleLike}  // Call handleLike function on click
      />
    
      <span>Likes : ({likes})</span>
    </div>
  );
};

export default PostActions;
