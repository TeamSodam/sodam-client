import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryWithToken } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  Review,
  ReviewByShopIdResponse,
  ReviewInfoRequestById,
  ReviewLikeScrapRequest,
  ReviewLikeScrapResponse,
  ReviewMyScrapResponse,
  ReviewMyWriteResponse,
  ReviewRecentResponse,
  ReviewShopIdRequestParams,
  ReviewWriteRequest,
} from 'types/review';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQueryWithToken,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getReviewRecent: builder.query<ReviewRecentResponse[], void>({
      query: () => ({ url: '/review/recent', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewRecentResponse[]>) => response.data,
    }),
    getMyWriteReview: builder.query<ReviewMyWriteResponse[], void>({
      query: () => ({ url: '/my/review/write', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewMyWriteResponse[]>) => response.data,
    }),
    getMyScrapReview: builder.query<ReviewMyScrapResponse[], void>({
      query: () => ({ url: '/my/review/scrap', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewMyScrapResponse[]>) => response.data,
    }),
    getReviewByShopId: builder.query<ReviewByShopIdResponse, ReviewShopIdRequestParams>({
      query: (shopInfo: ReviewShopIdRequestParams) => {
        const { shopId, sortType, offset, limit } = shopInfo;
        return {
          url: `/review/${shopId}`,
          method: 'GET',
          params: {
            sort: sortType,
            offset,
            limit,
          },
        };
      },
      transformResponse: (response: SodamResponse<ReviewByShopIdResponse>) => response.data,
    }),
    getShopReviewById: builder.query<Review, ReviewInfoRequestById>({
      query: ({ reviewId, shopId }) => ({
        url: `/shop/${shopId}/review/${reviewId}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<Review>) => response.data,
    }),
    postReview: builder.mutation<Review, ReviewWriteRequest>({
      query: (reviewInput) => {
        const formData = new FormData();
        Object.entries(reviewInput).forEach(([key, val]) => {
          if (Array.isArray(val)) {
            if (val.every((v) => v instanceof File)) {
              val.forEach((file) => formData.append('image', file));
            } else {
              formData.append(key, JSON.stringify(val));
            }
          } else formData.append(key, val);
        });
        return {
          url: '/review',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: SodamResponse<Review>) => response.data,
    }),
    postLike: builder.mutation<ReviewLikeScrapResponse, ReviewLikeScrapRequest>({
      query: ({ reviewId, isLiked }) => ({
        url: `/review/${reviewId}/like`,
        method: 'POST',
        body: {
          isLiked,
        },
      }),
      transformResponse: (response: SodamResponse<ReviewLikeScrapResponse>) => response.data,
    }),
    postScrap: builder.mutation<ReviewLikeScrapResponse, ReviewLikeScrapRequest>({
      query: ({ reviewId, isScraped }) => ({
        url: `/review/${reviewId}/scrap`,
        method: 'POST',
        body: {
          isScraped,
        },
      }),
      transformResponse: (response: SodamResponse<ReviewLikeScrapResponse>) => response.data,
    }),
  }),
});

export const {
  useGetReviewRecentQuery,
  useGetMyWriteReviewQuery,
  useGetMyScrapReviewQuery,
  useGetReviewByShopIdQuery,
  usePostReviewMutation,
  usePostLikeMutation,
  usePostScrapMutation,
  useGetShopReviewByIdQuery,
} = reviewApi;
