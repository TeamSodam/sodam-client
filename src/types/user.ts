import { ShopThemeType } from './shop';

export interface User {
  name: string;
  thumbnail: string;
}

export interface UserInfo {
  name: string;
  nickname: string;
  email: string;
}
export type UserTheme = ShopThemeType[];
export interface UserImage {
  image: string;
}
export type UserInfoAll = UserInfo & UserImage & UserTheme;
