import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryWithToken } from 'libs/api';
import { SodamResponse } from 'types/api';
import { UserImage, UserInfo, UserTheme } from 'types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQueryWithToken,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getUserInfo: builder.query<UserInfo, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<UserInfo>) => response.data,
    }),
    getUserImage: builder.query<UserImage, void>({
      query: () => ({
        url: '/user/image',
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<UserImage>) => response.data,
    }),
    getUserTheme: builder.query<{ theme: UserTheme }, void>({
      query: () => ({
        url: '/user/theme',
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<{ theme: UserTheme }>) => response.data,
    }),
    editUserNickname: builder.mutation<Pick<UserInfo, 'nickname'>, Pick<UserInfo, 'nickname'>>({
      query: ({ nickname }) => ({
        url: '/user/nickname',
        method: 'PUT',
        body: {
          nickname,
        },
      }),
      transformResponse: (response: SodamResponse<Pick<UserInfo, 'nickname'>>) => response.data,
    }),
    editUserTheme: builder.mutation<UserTheme, UserTheme>({
      query: (theme) => ({
        url: '/user/theme',
        method: 'PUT',
        body: {
          theme,
        },
      }),
      transformResponse: (response: SodamResponse<UserTheme>) => response.data,
    }),
    editUserImage: builder.mutation<UserImage, File>({
      query: (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        return {
          url: '/user/image',
          method: 'PUT',
          body: formData,
        };
      },
      transformResponse: (response: SodamResponse<UserImage>) => response.data,
    }),
    deleteUserImage: builder.mutation<void, void>({
      query: () => ({
        url: '/user/image',
        method: 'DELETE',
      }),
      transformResponse: (response: SodamResponse<void>) => response.data,
    }),
  }),
});

export const {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
  useEditUserNicknameMutation,
  useEditUserThemeMutation,
  useEditUserImageMutation,
  useDeleteUserImageMutation,
} = userApi;
