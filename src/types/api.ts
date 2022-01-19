interface WrappedResponse<T> {
  data: T;
  status: number;
  success: boolean;
  message: string;
}

export type SodamResponse<T> = WrappedResponse<T>;
