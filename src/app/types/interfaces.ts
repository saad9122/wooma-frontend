import { ReportStatus } from "./enums";

export interface IUser {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  phone_number: string;
  phone_verified_at: string | null;
  reports_created?: number;
  paid_reports?: number;
}

export interface IProperty {
  id: string;
  created_at: string;
  updated_at: string;

  user?: IUser;
  address: string;
  postcode: string;
  city?: string | null;
  reports?: IReport[];
}

export interface IReport {
  id: string;
  created_at: string;
  updated_at: string;
  user?: IUser;
  property?: IProperty;
  status: ReportStatus;
  payment_reference?: string | null;
  completion_percentage: number;
}

export interface PaginatedApiResponse<T> {
  success: boolean,
  data: {
    data: T;
    total: number;
    page: number,
    limit: number,
  },
  metadata: {
    timestamp: Date,
    mehtod: string,
    requestId: string


  }
}

export interface ApiError {
  success: boolean,
  error: {
    code: string,
    message: string;
    details: {
      message: string,
      statusCode: number
    }
  },
  metadata: {
    timestamp: Date,
    mehtod: string,
    requestId: string


  }
}

export interface IPaginationProps {
  page? : number,
  limit? : number
}

