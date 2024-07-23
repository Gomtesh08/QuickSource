// axiosInstance.js

import axios from 'axios';

const axiosInstance2 = axios.create({ // Timeout duration in milliseconds
  headers:
   {
     'Content-Type': 'application/json' ,
    }
});

// Add a request interceptor to include the token in the headers
axiosInstance2.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance2;
