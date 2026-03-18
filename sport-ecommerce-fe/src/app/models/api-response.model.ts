export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  timestamp?: string;
  errorCode?: string;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  errorCode: string;
  timestamp: string;
  errors?: Record<string, string[]>;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;
