import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from 'app/store';
import axios, { AxiosRequestConfig } from 'axios';
import { logout, setToken } from 'features/users/userSlice';
import { decodeJwt } from 'src/utils/decode-jwt';

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
    if (token) {
      headers.set('accesstoken', token);
      const decoded = decodeJwt(token);
      if (decoded) {
        const isExpired = decoded.exp * 1000 < new Date().getTime();
        console.log(
          isExpired ? '만료됐음' : `${(decoded.exp * 1000 - new Date().getTime()) / 1000}초 남음`,
        );
      }
    }

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

    const refreshResult = await client.post('/auth/refresh', null, {
      withCredentials: true,
      headers: {
        accesstoken: prevToken,
      },
    });

    if (refreshResult.statusText === 'OK') {
      const { accesstoken } = refreshResult.data.data;
      api.dispatch(setToken(accesstoken));
      console.log(`${accesstoken}으로 갱신완료`);
      result = await baseQuery(args, api, extraOptions);
    } else api.dispatch(logout());
  }
  return result;
};
