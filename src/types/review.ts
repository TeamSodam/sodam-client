import { PriceOptionList, ShopCategoryType } from './shop';

export interface Item {
  itemName: ShopCategoryType;
  price: PriceOptionList;
}
export interface Review {
  shopId: number;
  shopName: string;
  category: string[];
  reviewId: number;
  date: string;
  likeCount: number;
  scrapCount: number;
  isLiked: boolean;
  isScraped: boolean;
  writerThumbnail: string;
  writerName: string;
  image: File[];
  item: Item[];
  content: string;
  tag: string[];
  thumbnail: string;
  reviewCount: number;
}

export type ReviewWrite = Pick<Review, 'shopName' | 'image' | 'content' | 'tag' | 'item'>;
export type ReviewWriteKey = keyof ReviewWrite;

export interface ReviewRecentResponse {
  category: string[];
  shopName: string;
  reviewId: number;
  shopId: number;
  image: string[];
  writerName: string;
  writerThumbnail: string;
  likeCount: number;
  scrapCount: number;
  content: string;
}

export interface ReviewByShopIdData {
  reviewId: number;
  shopId: number;
  image: string[];
  writerName?: string;
  writerThumbnail?: string;
  likeCount: number;
  scrapCount: number;
  content: string;
}

export interface ReviewByShopIdResponse {
  reviewCount: number;
  data: ReviewByShopIdData[];
}

export interface ReviewMyWriteResponse {
  reviewId: number;
  shopId: number;
  shopName: string;
  category: string[];
  likeCount: number;
  scrapCount: number;
  content: string;
  image: string[];
  date: string;
}

export interface ReviewMyScrapResponse {
  category: string[];
  shopName: string;
  reviewId: number;
  shopId: number;
  image: string[];
  writerName: string;
  writerThumbnail: string;
  likeCount: number;
  scrapCount: number;
  content: string;
}

export interface ReviewInfoRequestById {
  reviewId: number;
  shopId: number;
}

export interface ReviewCardData {
  reviewId: number;
  shopId: number;
  image: string[];
  writerThumbnail?: string;
  writerName?: string;
  likeCount: number;
  scrapCount: number;
  content: string;
  date?: string;
  shopName?: string;
  category?: string[];
}

export type ReviewSortType = 'like' | 'save' | 'recent';

export interface ReviewPaginationType {
  offset: number;
  limit: number;
}

export interface ReviewShopIdRequestParams extends ReviewPaginationType {
  shopId: number;
  sortType: ReviewSortType;
}

export interface ReviewImage {
  file: File | null;
  preview: string | null;
}

export interface ReviewWriteRequest {
  shopId: number;
  shopName: string;
  image: File[];
  item: Item[];
  content: string;
  tag: string[];
}

export interface ReviewLikeScrapRequest {
  isLiked?: boolean;
  isScraped?: boolean;
  reviewId: number;
}

export interface ReviewLikeScrapResponse {
  isLiked?: boolean;
  isScraped?: boolean;
  likeCount: number;
  scrapCount: number;
}
