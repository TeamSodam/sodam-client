import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { ReviewInfo } from 'types/review';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getMyReview: builder.query<ReviewInfo[], void>({
      query: () => ({ url: '/review/my', method: 'GET' }),
    }),
    getRecentReview: builder.query<ReviewInfo[], void>({
      query: () => ({ url: '/review/recent', method: 'GET' }),
    }),
    postReview: builder.mutation<ReviewInfo, { token: string; reviewInfo: Required<ReviewInfo> }>({
      query: ({ token, reviewInfo }) => ({
        url: '/review',
        method: 'POST',
        data: reviewInfo,
        headers: {
          'Access-token': token,
        },
      }),
    }),
  }),
});

export const { useGetMyReviewQuery, useGetRecentReviewQuery, usePostReviewMutation } = reviewApi;
