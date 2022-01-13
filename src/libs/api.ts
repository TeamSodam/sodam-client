import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig } from 'axios';

const DEV_BASE_URL = 'http://localhost:4000';

export const axiosBaseQuery =
  (): BaseQueryFn<Partial<AxiosRequestConfig>, unknown, unknown> =>
  async ({ url, method, ...args }) => {
    try {
      const result = await axios({ url: DEV_BASE_URL + url, method, ...args });
      return { data: result.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: { status: error.response?.status, data: error.response?.data },
        };
      }
      throw new Error('axios 이외의 에러 발생');
    }
  };

export const client = axios.create({
  baseURL: DEV_BASE_URL,
});
