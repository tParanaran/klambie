import axios from 'axios';
import { getCookie } from 'cookies-next/client';

const axiosInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000',
  withCredentials: true,
});

axiosInstanceClient.interceptors.request.use(
  async (config) => {
    const token = getCookie('access_token');
    const sessionId = getCookie('sessionId');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    } else {
      config.headers = config.headers || {};
      config.headers.Cookie = `sessionId=${sessionId}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstanceClient;
