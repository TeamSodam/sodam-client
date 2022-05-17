import { ShopThemeType } from './shop';

export interface User {
  name: string;
  thumbnail: string;
}

export interface UserSignupRequest {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  themePreference: string;
}

export type inputIndexType =
  | 'name'
  | 'nickname'
  | 'email'
  | 'emailConfirm'
  | 'password'
  | 'passwordConfirm';

export type UserInfo = Pick<UserSignupRequest, 'name' | 'nickname' | 'email'>;
export type UserTheme = ShopThemeType[];
export interface UserImage {
  image: string;
}
export type UserInfoAll = UserInfo & UserImage & UserTheme;
