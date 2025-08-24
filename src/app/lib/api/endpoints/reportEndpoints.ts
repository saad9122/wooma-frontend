import { IPaginationProps, IReport, PaginatedApiResponse } from '@/app/types/interfaces';
import { apiClient } from '../client';

export interface IGetReportApiProps extends IPaginationProps {
    status? : string,
    is_paid?: boolean,
    start_date?: Date,
    end_date?: Date
}

export const reportApi = {
  getReports: async (params?: IGetReportApiProps): Promise<PaginatedApiResponse<IReport[]>> => {
    
    console.log(params, 'params in api');
    const response = await apiClient.get('/reports', {params});
    return response.data;
  },
};