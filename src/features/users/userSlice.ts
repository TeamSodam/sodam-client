import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

export interface UserState {
  token: string;
  userInfo: {
    nickname: string;
    email: string;
  };
}

type UserInfo = Pick<UserState, 'userInfo'>;

const initialState: UserState = {
  token: 'intial-test-token',
  userInfo: {
    nickname: 'WEB-VENGERS',
    email: 'test@test.com',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { setToken, setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.reducer.user;
export const selectUserToken = (state: RootState) => state.reducer.user.token;
export const selectUserInfo = (state: RootState) => state.reducer.user.userInfo;

export default userSlice.reducer;
