import { PriceOptionList, ShopCategoryType } from 'types/shop';

export const dropDownFilterList = {
  detail: ['스크랩 많은 순', '좋아요 많은 순', '최신 순'],
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

export const PriceFilterList: PriceOptionList[] = [
  '~ 2,900',
  '3,000 - 4,900',
  '5,000 - 9,900',
  '10,000 - 14,900',
  '20,000 ~',
];
