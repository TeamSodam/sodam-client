import { User } from 'types/user';

export interface Item {
  category: string;
  price: string;
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

export interface ReviewCardData extends Omit<Review, 'imageList' | 'itemList' | 'tagList'> {
  thumbnail: string;
}
