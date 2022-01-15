import SEOUL_ENUM from 'constants/SeoulAreaEnum';

export interface Shop {
  id: number;
  thumbnail: string;
  name: string;
  categoryList: string[];
  theme: string;
  station: string;
  tel: string;
  addressRoad: string; // 도로명
  addressLand: string; // 지번
  hour: string;
  website?: string;
  sns?: string;
}

export interface NewShop {
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
  image: string;
  close: string;
}

export interface ShopCardData extends Pick<Shop, 'id' | 'thumbnail' | 'name' | 'categoryList'> {
  rank?: number;
}

export type ShopRequestType = 'random' | 'popular';

export type ShopThemeType = '아기자기한' | '힙한' | '모던한' | '빈티지';

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
