import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a new instance of Axios with custom configuration
const api = axios.create({
  baseURL: 'http://nagamas-api.test',  // Your API base URL
  timeout: 10000,                      // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Default headers (e.g., content type)
  },
});

// Add a request interceptor to inject token into headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');  // Get token from AsyncStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);  // Handle errors
  }
);

// Optionally, add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error response globally (e.g., token expiration, 404, etc.)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Add code to handle unauthorized access (logout or refresh token)
    }
    return Promise.reject(error);
  }
);

export default api;
