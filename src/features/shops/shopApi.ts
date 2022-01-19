import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { SodamResponse } from 'types/api';
import {
  Shop,
  ShopCategoryType,
  ShopMainSortType,
  ShopResponse,
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
    getShopByShopId: builder.query<Shop[], number>({
      query: (shopId) => ({ url: `http://localhost:4000/shop?shopId=${shopId}`, method: 'GET' }),
    }),
    getShopByArea: builder.query<Shop[], string>({
      query: (area) => ({ url: `http://localhost:4000/shop?area=${area}`, method: 'GET' }),
    }),
    getShopInfo: builder.query<Shop[], ShopMainSortType>({
      query: (type) => ({ url: `http://localhost:4000/shop?type=${type}`, method: 'GET' }),
    }),
    getShopSearchResult: builder.query<Shop[], string>({
      query: (keyword) => ({
        url: `http://localhost:4000/shop?shopName=${keyword}`,
        method: 'GET',
      }),
    }),
    getShopBySubway: builder.query<Shop[], number>({
      query: (shopId) => ({ url: `http://localhost:4000/shop/${shopId}/location`, method: 'GET' }),
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
} = shopApi;
