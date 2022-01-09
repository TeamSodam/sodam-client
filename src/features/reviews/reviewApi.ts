import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ReviewInfo {
  author: string;
  likeCount: number;
  scrapCount: number;
  createdAt: string;
  content: string;
  tags: string[];
}

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getMyReview: builder.query<ReviewInfo[], void>({
      query: () => 'review/my',
    }),
    getRecentReview: builder.query<ReviewInfo[], void>({
      query: () => 'review/recent',
    }),
    postReview: builder.mutation<ReviewInfo, { token: string; reviewInfo: Required<ReviewInfo> }>({
      query: ({ token, reviewInfo }) => ({
        url: 'review',
        method: 'POST',
        body: reviewInfo,
        headers: {
          'Access-token': token,
        },
      }),
    }),
  }),
});

export const { useGetMyReviewQuery, useGetRecentReviewQuery, usePostReviewMutation } = reviewApi;
