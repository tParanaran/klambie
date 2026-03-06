'use server';
import axios from 'axios';
import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

const axiosInstanceServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:8000',
  withCredentials: true,
});

axiosInstanceServer.interceptors.request.use(
  async (config) => {
    const token = await getCookie('access_token', { cookies });
    const sessionId = await getCookie('sessionId', { cookies });
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

export default axiosInstanceServer;
