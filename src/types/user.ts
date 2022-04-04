export interface User {
  name: string;
  thumbnail: string;
}
export interface UserSignupRequest {
  name: { value: string | null; isComplete: boolean };
  email: { value: string | null; isComplete: boolean };
  emailConfirm: { value: string | null; isComplete: boolean };
  password: { value: string | null; isComplete: boolean };
  passwordConfirm: { value: string | null; isComplete: boolean };
  nickname: { value: string | null; isComplete: boolean };
  themePreference: { value: string[]; isComplete: boolean };
}
