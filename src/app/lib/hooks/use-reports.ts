'use client';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG, QUERY_KEYS } from '../util/constants';
import { IGetReportApiProps, reportApi } from '../api/endpoints/reportEndpoints';

export const useGetReports = (params?: IGetReportApiProps) => {

  return useQuery({
    queryKey:[...QUERY_KEYS.REPORTS.ALL, { 
                                        page: params?.page, 
                                        limit: params?.limit, 
                                        status: params?.status, 
                                        is_paid: params?.is_paid, 
                                        start_date: params?.start_date, 
                                        end_date: params?.end_date
                                        }],
    queryFn: () => reportApi.getReports(params),
    staleTime: API_CONFIG.STALE_TIME,
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  
};


export const useGetReportsSummary = () => {

  return useQuery({
    queryKey:[...QUERY_KEYS.REPORTS.SUMMARY],
    queryFn: () => reportApi.getReportsSummary(),
    staleTime: API_CONFIG.STALE_TIME,
    retry: API_CONFIG.RETRY_ATTEMPTS,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
  
};