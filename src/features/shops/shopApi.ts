import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { ShopInfo } from 'types/shop';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getRecommendedShop: builder.query<ShopInfo[], void>({
      query: () => ({ url: '/shop/recommend', method: 'GET' }),
    }),
    getHotShop: builder.query<ShopInfo[], void>({
      query: () => ({ url: '/shop/hot', method: 'GET' }),
    }),
    getShopByTheme: builder.query<ShopInfo[], string>({
      query: (themeType) => ({ url: `/theme/${themeType}`, method: 'GET' }),
    }),
  }),
});

export const { useGetRecommendedShopQuery, useGetHotShopQuery, useGetShopByThemeQuery } = shopApi;
