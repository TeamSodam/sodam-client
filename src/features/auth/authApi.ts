import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  EmailRequestType,
  EmailResponseType,
  NicknameRequestType,
  NicknameResponseType,
  SignupRequest,
} from 'types/auth';
import { UserTokenResponse } from 'types/user';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    postNickname: builder.mutation<NicknameResponseType, NicknameRequestType>({
      query: ({ nickname }) => ({
        url: 'https://server.sodam.me/auth/signup/nickname',
        method: 'POST',
        data: {
          nickname,
        },
      }),
      transformResponse: (response: SodamResponse<NicknameResponseType>) => response.data,
    }),
    postEmail: builder.mutation<EmailResponseType, EmailRequestType>({
      query: ({ email }) => ({
        url: 'https://server.sodam.me/auth/signup/sendmail',
        method: 'POST',
        data: {
          email,
        },
      }),
      transformResponse: (response: SodamResponse<EmailResponseType>) => response.data,
    }),
    postSignup: builder.mutation<UserTokenResponse, SignupRequest>({
      query: (signupForm) => ({
        url: 'https://server.sodam.me/auth/signup',
        method: 'POST',
        data: signupForm,
      }),
      transformResponse: (response: SodamResponse<UserTokenResponse>) => response.data,
    }),
  }),
});

export const { usePostNicknameMutation, usePostEmailMutation, usePostSignupMutation } = authApi;
