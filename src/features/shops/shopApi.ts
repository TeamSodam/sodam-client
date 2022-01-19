import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  Shop,
  ShopBookmarkRequestType,
  ShopCategoryType,
  ShopMainSortType,
  ShopResponse,
  ShopSearchResponse,
  ShopSubwayResponse,
  ShopThemeRequestType,
} from 'types/shop';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getShopByCategory: builder.query<Shop[], ShopCategoryType>({
      query: (categoryType) => ({
        url: `http://localhost:4000/shop/category?type=${categoryType}`,
        method: 'GET',
      }),
    }),
    getShopByTheme: builder.query<SodamResponse<ShopResponse[]>, ShopThemeRequestType>({
      query: ({ theme, sortType, offset, limit }) => ({
        url: 'https://server.sodam.me/shop',
        params: {
          theme,
          sort: sortType,
          offset,
          limit,
        },
        method: 'GET',
      }),
    }),
    getShopByShopId: builder.query<Shop, number>({
      query: (shopId) => ({
        url: `https://server.sodam.me/shop/${shopId}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<Shop>) => response.data,
    }),
    getShopByArea: builder.query<Shop[], string>({
      query: (area) => ({ url: `http://localhost:4000/shop?area=${area}`, method: 'GET' }),
    }),
    getShopInfo: builder.query<SodamResponse<ShopResponse[]>, ShopMainSortType>({
      query: (type) => ({
        url: `https://server.sodam.me/shop/recommend?type=${type}`,
        method: 'GET',
      }),
    }),
    getShopSearchResult: builder.query<ShopSearchResponse[], string>({
      query: (keyword) => ({
        url: `https://server.sodam.me/shop/search?keyword=${keyword}`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopSearchResponse[]>) => response.data,
    }),
    getShopBySubway: builder.query<ShopSubwayResponse, number>({
      query: (shopId) => ({
        url: `https://server.sodam.me/shop/${shopId}/location`,
        method: 'GET',
      }),
      transformResponse: (response: SodamResponse<ShopSubwayResponse>) => response.data,
    }),
    getShopByBookmark: builder.query<SodamResponse<ShopResponse[]>, ShopBookmarkRequestType>({
      query: ({ sort, offset, limit }) => ({
        url: `https://server.sodam.me/shop/bookmark?sort=${sort}&offset=${offset}&limit=${limit}`,
        method: 'GET',
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
} = shopApi;
