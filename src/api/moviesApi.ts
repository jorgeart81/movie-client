import { useAuthStore } from '@/store';
import axios from 'axios';

const moviesApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

moviesApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export { moviesApi };
