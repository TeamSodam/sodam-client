import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryWithToken } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  BookmarkResponseType,
  BookmarkResquestType,
  Shop,
  ShopAreaRequestType,
  ShopAreaResponse,
  ShopBookmarkRequestType,
  ShopMainSortType,
  ShopResponse,
  ShopSearchResponse,
  ShopSubwayResponse,
  ShopThemeRequestType,
} from 'types/shop';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQueryWithToken,
  tagTypes: ['ThemeShop'],
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getShopByCategory: builder.query<ShopResponse[], string>({
      query: (type) => ({
        url: '/shop/category',
        method: 'GET',
        params: {
          type,
        },
      }),
      transformResponse: (response: SodamResponse<ShopResponse[]>) => response.data,
    }),
    getShopByTheme: builder.query<ShopResponse[], ShopThemeRequestType>({
      query: ({ theme, sortType, offset, limit }) => ({
        url: '/shop',
        params: {
          theme,
          sort: sortType,
          offset,
          limit,
        },
        method: 'GET',
      }),
      providesTags: ['ThemeShop'],
      transformResponse: (response: SodamResponse<ShopResponse[]>) => response.data,
    }),
    getShopByShopId: builder.query<Shop, number>({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<Shop>) => response.data,
    }),
    getShopByArea: builder.query<ShopAreaResponse[], ShopAreaRequestType>({
      query: ({ area, sort }) => ({
        url: '/shop',
        method: 'GET',
        params: {
          area,
          sort,
        },
      }),
      transformResponse: (response: SodamResponse<ShopAreaResponse[]>) => response.data,
    }),
    getShopInfo: builder.query<ShopResponse[], ShopMainSortType>({
      query: (type) => ({
        url: `/shop/recommend?type=${type}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopAreaResponse[]>) => response.data,
    }),
    getShopSearchResult: builder.query<ShopSearchResponse[], string>({
      query: (keyword) => ({
        url: `/shop/search?keyword=${keyword}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopSearchResponse[]>) => response.data,
    }),
    getShopBySubway: builder.query<ShopSubwayResponse, number>({
      query: (shopId) => ({
        url: `/shop/${shopId}/location`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopSubwayResponse>) => response.data,
    }),
    getShopByBookmark: builder.query<ShopResponse[], ShopBookmarkRequestType>({
      query: ({ sort, offset, limit }) => ({
        url: `/shop/bookmark?sort=${sort}&offset=${offset}&limit=${limit}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopResponse[]>) => response.data,
    }),
    postBookmark: builder.mutation<SodamResponse<BookmarkResponseType>, BookmarkResquestType>({
      query: ({ shopId, isBookmarked }) => ({
        url: '/shop/bookmark',
        method: 'POST',
        body: {
          shopId,
          isBookmarked,
        },
      }),
    }),
  }),
});

export const {
  useGetShopInfoQuery,
  useGetShopByCategoryQuery,
  useGetShopByThemeQuery,
  useGetShopByAreaQuery,
  useGetShopByShopIdQuery,
  useGetShopSearchResultQuery,
  useGetShopBySubwayQuery,
  useGetShopByBookmarkQuery,
  usePostBookmarkMutation,
} = shopApi;
