import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const DEV_BASE_URL = 'http://localhost:4000';

export const axiosBaseQuery =
  (): BaseQueryFn<Partial<AxiosRequestConfig>, unknown, unknown> =>
  async ({ url, method, ...args }) => {
    try {
      const result = await axios({ url: DEV_BASE_URL + url, method, ...args });
      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        error: { status: axiosError.response?.status, data: axiosError.response?.data },
      };
    }
  };

export const client = axios.create({
  baseURL: DEV_BASE_URL,
});
