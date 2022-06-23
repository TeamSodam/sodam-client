import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  AuthResponseType,
  EmailPWRequestType,
  EmailResponseType,
  NicknameRequestType,
  NicknameResponseType,
  SignupRequest,
} from 'types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    postNickname: builder.mutation<NicknameResponseType, NicknameRequestType>({
      query: ({ nickname }) => ({
        url: '/auth/signup/nickname',
        method: 'POST',
        data: {
          nickname,
        },
      }),
      transformResponse: (response: SodamResponse<NicknameResponseType>) => response.data,
    }),
    postEmail: builder.mutation<EmailResponseType, Pick<EmailPWRequestType, 'email'>>({
      query: ({ email }) => ({
        url: '/auth/signup/sendmail',
        method: 'POST',
        data: {
          email,
        },
      }),
      transformResponse: (response: SodamResponse<EmailResponseType>) => response.data,
    }),
    postSignup: builder.mutation<Pick<AuthResponseType, 'accesstoken'>, SignupRequest>({
      query: (signupForm) => ({
        url: '/auth/signup',
        method: 'POST',
        data: signupForm,
      }),
      transformResponse: (response: SodamResponse<Pick<AuthResponseType, 'accesstoken'>>) =>
        response.data,
    }),
    postLogin: builder.mutation<AuthResponseType, EmailPWRequestType>({
      query: (loginInfo) => ({
        url: '/auth/login',
        method: 'POST',
        data: loginInfo,
      }),
      transformResponse: (response: SodamResponse<AuthResponseType>) => response.data,
    }),
  }),
});

export const {
  usePostNicknameMutation,
  usePostEmailMutation,
  usePostSignupMutation,
  usePostLoginMutation,
} = authApi;
