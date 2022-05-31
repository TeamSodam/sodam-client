import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

export interface UserState {
  isLogin: boolean;
  token: string | null;
  userInfo: {
    nickname: string;
    email: string;
  };
}

type UserInfo = Pick<UserState, 'userInfo'>;

const initialState: UserState = {
  isLogin: false,
  token: null,
  userInfo: {
    nickname: '소푸미',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.userInfo = { ...initialState.userInfo };
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.reducer.user;
export const selectUserToken = (state: RootState) => state.reducer.user.token;
export const selectUserInfo = (state: RootState) => state.reducer.user.userInfo;
export const selectIsLogin = (state: RootState) => state.reducer.user.isLogin;

export default userSlice.reducer;
