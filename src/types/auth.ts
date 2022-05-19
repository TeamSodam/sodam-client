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

export type UserSignupRequest = Record<
  InputIndexType,
  {
    value: string | null;
    isComplete: boolean;
  }
> & { themePreference: { value: string[]; isComplete: boolean } };

export interface nicknameResponseType {
  uniqueNickname: boolean;
}

export interface nicknameRequestType {
  nickname: string;
}
