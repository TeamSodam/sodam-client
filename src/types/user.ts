import { ShopThemeType } from './shop';

export interface User {
  name: string;
  thumbnail: string;
}
type InputIndexType =
  | 'name'
  | 'nickname'
  | 'email'
  | 'emailConfirm'
  | 'password'
  | 'passwordConfirm';

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
export type UserSignupRequest = Record<
  InputIndexType,
  {
    value: string | null;
    isComplete: boolean;
  }
> & { themePreference: { value: string[]; isComplete: boolean } };
