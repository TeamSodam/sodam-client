import { PriceList, ShopCategoryType } from './shop';

export interface Item {
  itemName: ShopCategoryType;
  price: PriceList;
}
export interface Review {
  shopId: number;
  shopName: string;
  category: string[];
  reviewId: number;
  date: Date;
  likeCount: number;
  scrapCount: number;
  isLiked: boolean;
  isScraped: boolean;
  writerThumbnail: string;
  writerName: string;
  image: string[];
  item: Item[];
  content: string;
  tag: string[];
  thumbnail: string;
  reviewCount: number;
}

export interface ReviewRecentResponse {
  reviewId: number;
  writerName: string;
  content: string;
  likeCount: number;
  scrapCount: number;
  image: string;
  shopName: string;
  category: string[];
  writerThumbnail: string;
}

export interface ReviewByShopIdResponse {
  reviewId: number;
  shopId: number;
  image: string[];
  userImage: string;
  nickname: string;
  likeCount: number;
  scrapCount: number;
  content: string;
}

export interface ReviewMyWriteResponse {
  reviewId: number;
  likeCount: number;
  scrapCount: number;
  content: string;
  image: string;
  date: Date;
}

export interface ReviewMyScrapResponse {
  writerName: string;
  content: string;
  scrapCount: number;
  likeCount: number;
  shopName: string;
  category: string;
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
  page?: number;
}

export interface ReviewImage {
  file: File | null;
  preview: string | null;
}
