import SEOUL_ENUM from 'constants/SeoulAreaEnum';

export interface Shop {
  shopName: string;
  shopId: number;
  phone: string;
  time: string;
  homepage: string;
  instagram: string;
  roadAddress: string;
  landAddress: string;
  category: string | string[];
  theme: string | string[];
  store: string;
  subway: string;
  blog: string;
  isBookmarked: boolean;
  image: string[];
  close: string;
  area: SeoulAreaType;
  reviewCount: number;
  bookmarkCount: number;
}

export interface ShopResponse {
  shopId: number;
  shopName: string;
  category: string[];
  image: string[];
}

export interface ShopAreaResponse extends ShopResponse {
  roadAddress: string;
  landAddress: string;
  reviewCount: number;
  time: string;
}

export interface ShopSearchResponse extends ShopResponse {
  theme: string[];
}

export interface ShopSubwayResponse {
  subway: string;
  shopList: ShopResponse[];
}

export interface ShopBookmarkRequestType {
  sort: string;
  offset: number;
  limit: number;
}

export type ShopThemeType = '아기자기한' | '힙한' | '모던한' | '빈티지';
export interface ShopThemeRequestType extends ShopPaginationType {
  sortType: ShopThemeSortType;
  theme: ShopThemeType;
}
export interface ShopCardData extends Pick<Shop, 'shopId' | 'image' | 'shopName' | 'category'> {
  rank?: number;
}

export type ShopMainSortType = 'random' | 'popular';
export type ShopThemeSortType = 'popular' | 'review';
export interface ShopPaginationType {
  offset: number;
  limit: number;
}

export type ShopRequestCategoryType =
  | '문구팬시'
  | '인테리어소품'
  | '주방용품'
  | '패션소품'
  | '공예품'
  | '인형장난감'
  | 'random';

export type ShopCategoryType =
  | '문구·팬시'
  | '인테리어소품'
  | '주방용품'
  | '패션소품'
  | '공예품'
  | '인형·장난감';

export type PriceList =
  | '2,900원 이하'
  | '3,000원-4,900원'
  | '5,000원-9,900원'
  | '10,000원-19,900원'
  | '20,000원-29,900원'
  | '30,000원-39,900원'
  | '40,000원-49,900원'
  | '50,000원-59,900원'
  | '60,000원-69,900원'
  | '70,000원-79,900원'
  | '80,000원-89,900원'
  | '90,000원-99,900원'
  | '100,000원 이상';

export type SeoulAreaType = keyof typeof SEOUL_ENUM;
export type ShopAreaSortType = 'popular' | 'mysave';

export interface ShopAreaRequestType {
  area: string;
  sort: ShopAreaSortType;
}

export interface BookmarkResquestType {
  shopId: number;
  isBookmarked: boolean;
}

export interface BookmarkResponseType {
  bookmarkCount: number;
}
