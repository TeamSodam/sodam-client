import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from 'app/store';
import axios, { AxiosRequestConfig } from 'axios';
import { logout, setToken } from 'features/users/userSlice';

const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'https://server.sodam.me';

export const axiosBaseQuery =
  (): BaseQueryFn<Partial<AxiosRequestConfig>, unknown, unknown> =>
  async ({ url, method, ...args }) => {
    try {
      const result = await axios({ url, method, ...args, baseURL: BASE_URL });
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
  baseURL: BASE_URL,
});

const baseQuery = fetchBaseQuery({
  credentials: 'include',
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).reducer.user.token;
    if (token) headers.set('accesstoken', token);

    return headers;
  },
});

export const fetchBaseQueryWithToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const prevToken = (api.getState() as RootState).reducer.user.token;

    if (!prevToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
      headers: {
        accesstoken: prevToken,
      },
    });

    if (refreshResult.statusText === 'OK') {
      const { data } = await refreshResult.json();

      api.dispatch(setToken(data.accesstoken));
      result = await baseQuery(args, api, extraOptions);
    } else api.dispatch(logout());
  }
  return result;
};
