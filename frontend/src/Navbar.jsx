import React, { useState } from 'react'
import './Navbar.css'
import logo from './Images/logo.jpg'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import { logout } from './Logout'

const Navbar = () => {

 const [showDropdown,setShowDropdown] = useState(false);

 const toggleDropdown = ()=>{

 setShowDropdown(!showDropdown);

 };

  return (
    <div className='navBarContainer'>
        <div className='profileImageDiv'>
           <img 
           src= {logo}
           alt="image"
           className='userProfileImage'
           
           onClick={toggleDropdown}
           
           />
             {
             showDropdown && 
             (
                 <div className='dropDownContainer'>
                  <div className='dropdownContent'>
                  <a href="https://google.com"> Edit Profile</a>
                   <hr />
                  <Link to='/getsavedposts'>Saved Posts</Link>
                  <hr />
                  <Link to='/getuserposts'>Your Posts</Link>
                  <hr />
                  <Link to='/' onClick={logout}>Logout</Link>
                </div>
                 </div>
             )
           }
         
        </div>

        <div className='postDiv'>
               <Link to ="/uploadpost" className='postAnchorTag'>Post</Link>
        </div>

        <div>
          <SearchBar/>
        </div>

    </div>
  )
}

export default Navbar
  