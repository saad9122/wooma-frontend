import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from '../util/constants';
import { useAuthStore } from '../store/auth-store';
import { ApiError } from '@/app/types/interfaces';

// Create axios instance
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
//   (error: AxiosError) => {
//     const apiError: ApiError = {
//       message: 'An error occurred',
//       status: error.response?.status || 500,
//     };

//     if (error.response?.data) {
//       const errorData = error.response.data as any;
//       apiError.message = errorData.message || apiError.message;
//       apiError.errors = errorData.errors;
//     }

//     // Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       useAuthStore.getState().logout();
//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(apiError);
//   }
);
