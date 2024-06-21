import axios from 'axios';
import { getUserLocalStorage } from '../utils/auth';

export const Api = axios.create({
  baseURL: 'http://localhost:3333/',
  // baseURL: 'https://saltypoint-backend.onrender.com/',
});

Api.interceptors.request.use(
  config => {
    const user = getUserLocalStorage();
    if (user === undefined || user === null) {
      delete config.headers.Authorization;
      return config;
    }

    config.headers.Authorization = `Bearer ${user}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
