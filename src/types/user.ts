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
