'use client';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, QUERY_KEYS } from '../util/constants';
import { userApi } from '../api/endpoints/userEndpoints';

export const useUsers = (params?: {
  page?: number;
  limit?: number;
  id?: string;
  phone_number?: string;
  
}) => {
  return useQuery({
    queryKey:[...QUERY_KEYS.USERS.ALL, { page: params?.page, limit: params?.limit, id: params?.id, phone_number: params?.phone_number }],
    queryFn: () => userApi.getUsers(params),
    staleTime: API_CONFIG.STALE_TIME,
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};