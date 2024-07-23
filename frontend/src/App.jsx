import React, { useState } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import PostUpload from './PostUpload';
import SignUp from './SignUp';
import Signin from './Signin';
import Hero from './Hero';
import { Navigate } from 'react-router-dom';  // Ensure Navigate is imported correctly
import { isLoggedIn } from './Logout';
import UserPosts from './UserPosts';

import EditPost from './EditPost'
import SavedPosts from './SavedPosts';
function App() {
  // Redirect to home if user is not logged in
  const [log,setLog] = useState(isLoggedIn());

  return (
    <div className='mainDiv'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          {

            log && <>
            
            <Route path="/hero" element={<Hero />} />
          <Route path="/posts" element={<Posts />} />
          <Route path='/getuserposts' element ={<UserPosts/>} />
          <Route path="/uploadpost" element={<PostUpload />} />
          <Route path='/editpost' element={<EditPost/>}/>
          <Route path ="/getsavedposts" element ={ <SavedPosts/>} />
          
            </>

          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
