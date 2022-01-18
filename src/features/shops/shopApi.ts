import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'libs/api';
import { Shop, ShopCategoryType, ShopMainSortType, ShopThemeRequestType } from 'types/shop';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: axiosBaseQuery(),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    // builder.query<T, U>() --> T는 쿼리의 반환값 타입, U는 쿼리 파라미터의 타입.
    getShopByCategory: builder.query<Shop[], ShopCategoryType>({
      query: (categoryType) => ({ url: `/shop/category?type=${categoryType}`, method: 'GET' }),
    }),
    getShopByTheme: builder.query<Shop[], ShopThemeRequestType>({
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
    }),
    getShopByShopId: builder.query<Shop[], number>({
      query: (shopId) => ({ url: `/shop?shopId=${shopId}`, method: 'GET' }),
    }),
    getShopByArea: builder.query<Shop[], string>({
      query: (area) => ({ url: `/shop?area=${area}`, method: 'GET' }),
    }),
    getShopInfo: builder.query<Shop[], ShopMainSortType>({
      query: (type) => ({ url: `/shop?type=${type}`, method: 'GET' }),
    }),
    getShopSearchResult: builder.query<Shop[], string>({
      query: (keyword) => ({ url: `/shop?shopName=${keyword}`, method: 'GET' }),
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
} = shopApi;
