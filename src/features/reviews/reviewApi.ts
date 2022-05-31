import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
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
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).reducer.user.token;
      if (token) headers.set('accesstoken', token);

      return headers;
    },
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getReviewRecent: builder.query<ReviewRecentResponse[], void>({
      query: () => ({ url: 'https://server.sodam.me/review/recent', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewRecentResponse[]>) => response.data,
    }),
    getMyWriteReview: builder.query<ReviewMyWriteResponse[], void>({
      query: () => ({ url: 'https://server.sodam.me/my/review/write', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewMyWriteResponse[]>) => response.data,
    }),
    getMyScrapReview: builder.query<ReviewMyScrapResponse[], void>({
      query: () => ({ url: 'https://server.sodam.me/my/review/scrap', method: 'GET' }),
      transformResponse: (response: SodamResponse<ReviewMyScrapResponse[]>) => response.data,
    }),
    getReviewByShopId: builder.query<ReviewByShopIdResponse, ReviewShopIdRequestParams>({
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
      transformResponse: (response: SodamResponse<ReviewByShopIdResponse>) => response.data,
    }),
    getShopReviewById: builder.query<Review, ReviewInfoRequestById>({
      query: ({ reviewId, shopId }) => ({
        url: `https://server.sodam.me/shop/${shopId}/review/${reviewId}`,
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
          url: 'https://server.sodam.me/review',
          method: 'POST',
          data: formData,
        };
      },
      transformResponse: (response: SodamResponse<Review>) => response.data,
    }),
    postLike: builder.mutation<ReviewLikeScrapResponse, ReviewLikeScrapRequest>({
      query: ({ reviewId, isLiked }) => ({
        url: `https://server.sodam.me/review/${reviewId}/like`,
        method: 'POST',
        data: {
          isLiked,
        },
      }),
      transformResponse: (response: SodamResponse<ReviewLikeScrapResponse>) => response.data,
    }),
    postScrap: builder.mutation<ReviewLikeScrapResponse, ReviewLikeScrapRequest>({
      query: ({ reviewId, isScraped }) => ({
        url: `https://server.sodam.me/review/${reviewId}/scrap`,
        method: 'POST',
        data: {
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
