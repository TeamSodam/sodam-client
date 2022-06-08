export interface NicknameResponseType {
  uniqueNickname: boolean;
}

export interface NicknameRequestType {
  nickname: string;
}

export interface EmailPWRequestType {
  email: string | null;
  password: string | null;
}

export interface EmailResponseType {
  uniqueEmail: boolean;
  verificationCode: string;
}
export interface AuthResponseType {
  accesstoken: string;
  nickname: string;
  name: string;
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

export interface SignupRequest {
  [key: string]: string;
}
