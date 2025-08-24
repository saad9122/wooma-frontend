import { IUser, PaginatedApiResponse } from '@/app/types/interfaces';
import { apiClient } from '../client';


export const userApi = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedApiResponse<IUser[]>> => {
    const response = await apiClient.get('/user', { params });
    return response.data;
  },
};