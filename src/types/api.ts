import { AxiosResponse } from 'axios';

export interface SodamResponse<T> extends AxiosResponse {
  data: {
    data: T;
    status: number;
    success: boolean;
    message: string;
  };
}
