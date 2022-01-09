import type { AnyAction, Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { reviewApi } from 'features/reviews/reviewApi';
import { shopApi } from 'features/shops/shopApi';
import { createWrapper } from 'next-redux-wrapper';
import reducer, { RootReducerState } from 'reducers';

export const makeStore = () =>
  configureStore({
    reducer: {
      user: reducer as Reducer<RootReducerState, AnyAction>,
      [shopApi.reducerPath]: shopApi.reducer,
      [reviewApi.reducerPath]: reviewApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
  });

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });

const store = makeStore();
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
