import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';
import axiosInstance2 from './axiosIntance2';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [keywords, setKeywords] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        '/process',
        { sentence: searchTerm }
      );
      setKeywords(response.data.keywords);

      const backendResponse = await axiosInstance2.post(
        '/quicksource/posts',
        { keywordsFound: response.data.keywords },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (backendResponse.status === 200) {
        // Store fetched data in local storage
        localStorage.setItem('postsData', JSON.stringify(backendResponse.data));
       
        
        // Redirect to /posts page
        window.location.href = '/posts';
      } else {
        alert('Error: Backend request failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while fetching data.');
    }
  };

  return (
    <div className='searchBarContainer'>
      <input
        type="text"
        className='searchBarInput'
        placeholder='Search....🔍'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='searchButton' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
