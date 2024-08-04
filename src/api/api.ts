import axios from 'axios';
import { refreshToken } from './refreshToken'; // Import the refresh token function

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://api.kafryuba.com/api/', // Replace with your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or any other storage
    const token = localStorage.getItem('token');

    // If the token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const newToken = await refreshToken();

        // Store the new token
        localStorage.setItem('token', newToken);

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // Handle the error if token refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;