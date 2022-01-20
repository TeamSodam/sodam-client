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
  date: string;
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

export interface ReviewByShopIdResponse {
  reviewId: number;
  shopId: number;
  image: string[];
  writerName: string;
  writerThumbnail: string;
  likeCount: number;
  scrapCount: number;
  content: string;
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
