import { IPaginationProps, IReport, PaginatedApiResponse } from '@/app/types/interfaces';
import { apiClient } from '../client';
import { IReportSummary } from '../../../types/interfaces';

export interface IGetReportApiProps extends IPaginationProps {
    status? : string,
    is_paid?: boolean,
    start_date?: string,
    end_date?: string
}

export const reportApi = {
  getReports: async (params?: IGetReportApiProps): Promise<PaginatedApiResponse<IReport[]>> => {
        const response = await apiClient.get('/reports', {params});
    return response.data;
  },
  getReportsSummary: async (): Promise<PaginatedApiResponse<IReportSummary>> => {
        const response = await apiClient.get('/reports/summary');
    return response.data;
  },
};