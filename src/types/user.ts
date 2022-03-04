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
