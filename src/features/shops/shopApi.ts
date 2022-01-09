import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShopInfoInMarker as ShopInfo } from 'types/map';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getRecommendedShop: builder.query<ShopInfo[], void>({
      query: () => 'shop/recommend',
    }),
    getHotShop: builder.query<ShopInfo[], void>({
      query: () => 'shop/hot',
    }),
    getShopByTheme: builder.query<ShopInfo[], string>({
      query: (themeType) => `theme/${themeType}`,
    }),
  }),
});

export const { useGetRecommendedShopQuery, useGetHotShopQuery, useGetShopByThemeQuery } = shopApi;
