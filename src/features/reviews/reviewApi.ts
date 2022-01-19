import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  Review,
  ReviewByShopIdResponse,
  ReviewInfoRequestById,
  ReviewRecentResponse,
  ReviewShopIdRequestParams,
} from 'types/review';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getReviewRecent: builder.query<SodamResponse<ReviewRecentResponse[]>, void>({
      query: () => ({ url: 'https://server.sodam.me/review/recent', method: 'GET' }),
    }),
    getMyWriteReview: builder.query<Review[], void>({
      query: () => ({ url: 'http://localhost:4000/my/review/write', method: 'GET' }),
    }),
    getMyScrapReview: builder.query<Review[], void>({
      query: () => ({ url: 'http://localhost:4000/my/review/scrap', method: 'GET' }),
    }),
    getReviewByShopId: builder.query<ReviewByShopIdResponse[], ReviewShopIdRequestParams>({
      query: (shopInfo: ReviewShopIdRequestParams) => {
        const { shopId, sortType, offset, limit } = shopInfo;
        return {
          url: `https://server.sodam.me/review/${shopId}`,
          method: 'GET',
          params: {
            sort: sortType,
            offset,
            limit,
          },
        };
      },
      transformResponse: (response: SodamResponse<ReviewByShopIdResponse[]>) => response.data,
    }),
    getShopReviewById: builder.query<Review[], ReviewInfoRequestById>({
      query: ({ reviewId, shopId }) => ({
        url: `http://localhost:4000/shop/${shopId}/review/${reviewId}`,
        method: 'GET',
      }),
    }),
    postReview: builder.mutation<Review, { token: string; reviewInfo: Required<Review> }>({
      query: ({ token, reviewInfo }) => ({
        url: 'http://localhost:4000/review',
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
  useGetReviewRecentQuery,
  useGetMyWriteReviewQuery,
  useGetMyScrapReviewQuery,
  useGetReviewByShopIdQuery,
  usePostReviewMutation,
  useGetShopReviewByIdQuery,
} = reviewApi;
