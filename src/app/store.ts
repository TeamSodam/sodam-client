import type { AnyAction, Reducer, Unsubscribe } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'features/auth/authApi';
import { reviewApi } from 'features/reviews/reviewApi';
import { shopApi } from 'features/shops/shopApi';
import { userApi } from 'features/users/userApi';
import { createWrapper } from 'next-redux-wrapper';
import reducer, { RootReducerState } from 'reducers';

import { subscribeToken } from './persistToken';

const store = configureStore({
  reducer: {
    reducer: reducer as Reducer<RootReducerState, AnyAction>,
    [shopApi.reducerPath]: shopApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      shopApi.middleware,
      reviewApi.middleware,
      userApi.middleware,
      authApi.middleware,
    ]),
});

const observers: Unsubscribe[] = [];

export const clearObserver = () => observers.splice(0, observers.length);
export const isObserverExist = () => observers.length === 0;

export const subscribeState = <T>(
  selector: (state: RootState) => T,
  onChange: (state: T, dispatch: AppDispatch) => void,
  onDelete: (state: T, dispatch: AppDispatch) => void,
) => {
  let currentState: T | undefined = undefined;
  const handleChange = () => {
    const state = store.getState();
    const nextState = selector(state);

    if (currentState && !nextState) onDelete(nextState, store.dispatch);
    else if (currentState !== nextState) onChange(nextState, store.dispatch);
    currentState = nextState;
  };

  observers.push(store.subscribe(handleChange));
  handleChange();
};

subscribeToken();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper(() => store, {
  debug: process.env.NODE_ENV !== 'production',
});
