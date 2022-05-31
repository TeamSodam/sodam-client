import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from 'app/store';
import axios, { AxiosRequestConfig } from 'axios';

const DEV_BASE_URL = 'http://localhost:4000';

export const axiosBaseQuery =
  (): BaseQueryFn<Partial<AxiosRequestConfig>, unknown, unknown> =>
  async ({ url, method, ...args }) => {
    try {
      const result = await axios({ url, method, ...args });
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

export const fetchBaseQueryWithToken = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).reducer.user.token;
    if (token) headers.set('accesstoken', token);

    return headers;
  },
});
