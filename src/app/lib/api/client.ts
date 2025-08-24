import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from '../util/constants';
import { useAuthStore } from '../store/auth-store';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token || localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken")

      // redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login"
      }
    }

    return Promise.reject(error)
  }
)
