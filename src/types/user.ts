export interface User {
  name: string;
  thumbnail: string;
}
export interface UserSignupRequest {
  name: { value: string; isComplete: boolean };
  email: { value: string; isComplete: boolean };
  emailConfirm: { value: string; isComplete: boolean };
  password: { value: string; isComplete: boolean };
  passwordConfirm: { value: string; isComplete: boolean };
  nickname: { value: string; isComplete: boolean };
  themePreference: { value: string[]; isComplete: boolean };
}
