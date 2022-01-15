import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { NewShop as Shop, ShopCategoryType, ShopRequestType, ShopThemeType } from 'types/shop';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getShopByCategory: builder.query<Shop[], ShopCategoryType>({
      query: (categoryType) => ({ url: `/shop/category?type=${categoryType}`, method: 'GET' }),
    }),
    getShopByTheme: builder.query<Shop[], ShopThemeType>({
      query: (theme) => ({ url: `/shop?theme=${theme}`, method: 'GET' }),
    }),
    getShopByArea: builder.query<Shop[], string>({
      query: (area) => ({ url: `/shop?area=${area}`, method: 'GET' }),
    }),
    getShopInfo: builder.query<Shop[], ShopRequestType>({
      query: (type) => ({ url: `/shop?type=${type}`, method: 'GET' }),
    }),
  }),
});

export const {
  useGetShopInfoQuery,
  useGetShopByCategoryQuery,
  useGetShopByThemeQuery,
  useGetShopByAreaQuery,
} = shopApi;
