import type { AnyAction, CombinedState } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import user, { UserState } from 'features/users/userSlice';
import { HYDRATE } from 'next-redux-wrapper';

// feature가 추가될 경우 해당 feature의 state interface를 여기에 추가해주면 됨.
export interface RootReducerState {
  user: UserState;
}

const reducer = (state: RootReducerState, action: AnyAction): CombinedState<RootReducerState> => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({ user })(state, action);
};

export default reducer;
