import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { NewReview as Review, ReviewShopIdRequestParams } from 'types/review';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getReview: builder.query<Review[], void>({
      query: () => ({ url: '/review', method: 'GET' }),
    }),
    getMyWriteReview: builder.query<Review[], void>({
      query: () => ({ url: '/my/review/write', method: 'GET' }),
    }),
    getMyScrapReview: builder.query<Review[], void>({
      query: () => ({ url: '/my/review/scrap', method: 'GET' }),
    }),
    getReviewByShopId: builder.query<Review[], ReviewShopIdRequestParams>({
      query: (shopInfo: ReviewShopIdRequestParams) => {
        const { shopId, sortType } = shopInfo;
        return {
          url: `/review/${shopId}?sort=${sortType}`,
          method: 'GET',
        };
      },
    }),
    postReview: builder.mutation<Review, { token: string; reviewInfo: Required<Review> }>({
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

export const {
  useGetReviewQuery,
  useGetMyWriteReviewQuery,
  useGetMyScrapReviewQuery,
  useGetReviewByShopIdQuery,
  usePostReviewMutation,
} = reviewApi;
