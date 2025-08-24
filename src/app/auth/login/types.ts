export interface SendOtpResponse {
  success: boolean;
  message?: string;
  data?: {
    message: string;
  };
}

export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  data?: {
    access_token: string;
    refresh_token: string;
  };
}
