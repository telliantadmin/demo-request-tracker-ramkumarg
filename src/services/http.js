import axios from 'axios';
import { Navigate } from 'react-router-dom';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token && !config.url.startsWith('/auth')) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 403) {
      const { config } = error;
      if (!config.url.startsWith('/auth')) {
        Navigate('/user/login');
      }
    }
    return Promise.reject(error);
  }
);

export default http;
