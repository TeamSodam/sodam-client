import { PriceList, ShopCategoryType } from './shop';

export interface Item {
  itemName: ShopCategoryType;
  price: PriceList;
}
export interface Review {
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
  item: Item[];
  content: string;
  tag: string[];
  writerThumbnail: string;
  writerName: string;
  thumbnail: string;
  reviewCount: number;
}

export interface ReviewInfoRequestById {
  reviewId: number;
  shopId: number;
}

export interface ReviewCardData extends Omit<Review, 'item' | 'tag' | 'image'> {
  thumbnail: string;
}

export type ReviewSortType = 'save' | 'review' | 'recent';

export interface ReviewShopIdRequestParams {
  shopId: number;
  sortType: ReviewSortType;
  page: number;
}

export interface ReviewImage {
  file: File | null;
  preview: string | null;
}
