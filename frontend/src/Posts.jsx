// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { storage } from './firebase';
// import { ref, listAll, getDownloadURL } from 'firebase/storage';
// import './Posts.css'; // Import your CSS file
// import axios from 'axios';
// import PostActions from './PostActions'; // Import the PostActions component

// const Posts = () => {
//   const [postsData, setPostsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [images, setImages] = useState([]);

//   const imagesRef = ref(storage, 'images/');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch images list from Firebase Storage
//         const imageList = await listAll(imagesRef);
//         const imageUrls = await Promise.all(
//           imageList.items.map((itemRef) => getDownloadURL(itemRef))
//         );
//         setImages(imageUrls);

//         // Simulate fetching posts data (replace with your actual data fetching logic)
//         const storedData = localStorage.getItem('postsData');
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           if (parsedData.data && Array.isArray(parsedData.data)) {
//             setPostsData(parsedData.data);
//           } else {
//             console.error('Stored data is not in expected format:', parsedData);
//           }
//         } else {
//           console.error('No data found in localStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on component mount

//   return (
//     <div>
//       <Navbar />
//       <div className='postscontainer'>
//         <h1>Posts</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="posts-list">
//             {postsData.map((post, index) => (
//               <div key={post._id} className="post">
//                 <img src={images[index]} className="post-image" alt="Post" />
//                 <div className="post-details">
//                   <h3 className="post-title">{post.title}</h3>
//                   <p className="post-description">{post.description}</p>
//                   <a href={post.linkInput} className="post-link">Link</a>
//                 </div>
//                 <PostActions postId={post._id} initialLikes={post.likes} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Posts;
/*
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './Posts.css'; // Import your CSS file
import axios from 'axios';
import PostActions from './PostActions'; // Import the PostActions component

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const imagesRef = ref(storage, 'images/');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch images list from Firebase Storage
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(
          imageList.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImages(imageUrls);

        // Simulate fetching posts data (replace with your actual data fetching logic)
        const storedData = localStorage.getItem('postsData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.data && Array.isArray(parsedData.data)) {
            // Sort posts by likes (descending) and createdAt (descending)
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
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      <Navbar />
      <div className='postscontainer'>
        <h1> Posts </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="posts-list">
            {postsData.map((post, index) => (
              <div key={post._id} className="post">
                <img src={images[index]} className="post-image" alt="Post" />
                <div className="post-details">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <p> Created By {post.username}</p>
                  <a href={post.linkInput} className="post-link">Link</a>
                </div>
                <PostActions postId={post._id} initialLikes={post.likes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts; */ 

// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { storage } from './firebase';
// import { ref, listAll, getDownloadURL } from 'firebase/storage';
// import './Posts.css'; // Import your CSS file
// import PostActions from './PostActions'; // Import the PostActions component
// import axiosInstance2 from './axiosIntance2';

// const Posts = () => {
//   const [postsData, setPostsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [images, setImages] = useState({}); // Use an object to store image URLs
//   const[postid,setPostId] = useState('');

//   const imagesRef = ref(storage, 'images/');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch images list from Firebase Storage
//         const imageList = await listAll(imagesRef);
//         const imageUrls = await Promise.all(
//           imageList.items.map(async (itemRef) => {
//             const url = await getDownloadURL(itemRef);
//             return { name: itemRef.name, url };
//           })
//         );

//         // Create an object to map image names to URLs
//         const imageMap = imageUrls.reduce((acc, { name, url }) => {
//           acc[name] = url;
//           return acc;
//         }, {});
//         setImages(imageMap);

//         // Simulate fetching posts data (replace with your actual data fetching logic)
//         const storedData = localStorage.getItem('postsData');
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           if (parsedData.data && Array.isArray(parsedData.data)) {
//             // Sort posts by likes (descending) and createdAt (descending)
//             const sortedPosts = parsedData.data.sort((a, b) => {
//               if (a.likes !== b.likes) {
//                 return b.likes - a.likes; // Sort by likes in descending order
//               } else {
//                 return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
//               }
//             });
//             setPostsData(sortedPosts);
//           } else {
//             console.error('Stored data is not in expected format:', parsedData);
//           }
//         } else {
//           console.error('No data found in localStorage');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures this runs only once on component mount


//   const handleSave = async (PostId)=>{

//      try {

//       console.log(PostId);
//         const response = await axiosInstance2.post('/quicksource/savepost',{PostId});


//         if(response.status == 200) 
//           {
//              alert(response.data.message);
//           }
//           else
//           {
//                 alert("Post is not Saved Successfully!");
//           }

//      } catch (error) {
//              console.error("Error : ",error);
//      }

//   }

//   return (
//     <div>
//       <Navbar />
//       <div className='postscontainer'>
//         <h1> Posts </h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="posts-list">
//             {postsData.map((post) => (
//               <div key={post._id} className="post">
//                 <img src={images[post.imageName]} className="post-image" alt="Post" />
//                 <div className="post-details">
//                   <h3 className="post-title">{post.title}</h3>
//                   <p className="post-description">{post.description}</p>
//                   <p> Created By {post.username}</p>
//                   <a href={post.linkInput} className="post-link">Link</a>
//                 </div>
//                 <PostActions postId={post._id} initialLikes={post.likes} />
//                 <button onClick={()=> handleSave(post._id)}>Save </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { storage } from './firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import './Posts.css'; // Import your CSS file
import PostActions from './PostActions'; // Import the PostActions component
import axiosInstance2 from './axiosIntance2';
import { FaThumbsUp, FaBookmark } from 'react-icons/fa'; // Import Font Awesome icons for like and save

const Posts = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({}); // Use an object to store image URLs
  const [postid, setPostId] = useState('');

  const imagesRef = ref(storage, 'images/');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch images list from Firebase Storage
        const imageList = await listAll(imagesRef);
        const imageUrls = await Promise.all(
          imageList.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );

        // Create an object to map image names to URLs
        const imageMap = imageUrls.reduce((acc, { name, url }) => {
          acc[name] = url;
          return acc;
        }, {});
        setImages(imageMap);

        // Simulate fetching posts data (replace with your actual data fetching logic)
        const storedData = localStorage.getItem('postsData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          if (parsedData.data && Array.isArray(parsedData.data)) {
            // Sort posts by likes (descending) and createdAt (descending)
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
  }, []); // Empty dependency array ensures this runs only once on component mount

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

