export interface NicknameResponseType {
  uniqueNickname: boolean;
}

export interface NicknameRequestType {
  nickname: string;
}

export interface EmailRequestType {
  email: string;
}

export interface EmailResponseType {
  uniqueEmail: boolean;
  verificationCode: string;
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
