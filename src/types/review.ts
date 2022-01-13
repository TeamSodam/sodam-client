import { User } from 'types/user';

import { PriceList, ShopCategoryType } from './shop';

export interface Item {
  category: string;
  price: string;
}

export interface NewItem {
  itemName: ShopCategoryType;
  price: PriceList;
}
export interface Review {
  id: number;
  imageList?: string[];
  shopName: string;
  shopCategoryList: string[];
  itemList?: Item[];
  text: string;
  tagList?: string[];
  writer: User;
  date: string;
  liked: number;
  saved: number;
}

export interface NewReview {
  shopId: number;
  shopName: string;
  category: string[] | string;
  reviewId: number;
  date: Date | string;
  isLiked: boolean;
  isScraped: boolean;
  likeCount: number;
  scrapCount: number;
  image: string[];
  item: NewItem[];
  content: string;
  tag: string[];
  writerThumbnail: string;
  writerName: string;
}

export interface ReviewCardData extends Omit<Review, 'imageList' | 'itemList' | 'tagList'> {
  thumbnail: string;
}

export interface NewReviewCardData extends Omit<NewReview, 'item' | 'tag' | 'image'> {
  thumbnail: string;
}

export type ReviewSortType = 'save' | 'review' | 'recent';

export interface ReviewShopIdRequestParams {
  shopId: number;
  sortType: ReviewSortType;
}
