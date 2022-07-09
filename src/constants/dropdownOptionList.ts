import { PriceList, ShopCategoryType } from 'types/shop';

export const dropDownFilterList = {
  detail: ['좋아요 많은 순', '스크랩 많은 순', '최신 순'],
  theme: ['저장 많은 순', '리뷰 많은 순'],
  collect: ['저장 많은 순', '리뷰 많은 순', '최근 저장한 순'],
};

export const MoreFilterList: ShopCategoryType[] = [
  '문구·팬시',
  '인테리어소품',
  '주방용품',
  '패션소품',
  '공예품',
  '인형·장난감',
];

export const PriceFilterList: PriceList[] = [
  '2,900원 이하',
  '3,000원-4,900원',
  '5,000원-9,900원',
  '10,000원-19,900원',
  '20,000원-29,900원',
  '30,000원-39,900원',
  '40,000원-49,900원',
  '50,000원-59,900원',
  '60,000원-69,900원',
  '70,000원-79,900원',
  '80,000원-89,900원',
  '90,000원-99,900원',
  '100,000원 이상',
];
