export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error: {
    code: string;
    message: string;
  } | null;
}
