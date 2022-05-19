import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  emailRequestType,
  emailResponseType,
  nicknameRequestType,
  nicknameResponseType,
} from 'types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    postNickname: builder.mutation<nicknameResponseType, nicknameRequestType>({
      query: ({ nickname }) => ({
        url: 'https://server.sodam.me/auth/signup/nickname',
        method: 'POST',
        data: {
          nickname,
        },
      }),
      transformResponse: (response: SodamResponse<nicknameResponseType>) => response.data,
    }),
    postEmail: builder.mutation<emailResponseType, emailRequestType>({
      query: ({ email }) => ({
        url: 'https://server.sodam.me/auth/signup/sendmail',
        method: 'POST',
        data: {
          email,
        },
      }),
      transformResponse: (response: SodamResponse<emailResponseType>) => response.data,
    }),
  }),
});

export const { usePostNicknameMutation, usePostEmailMutation } = authApi;
