import type { AnyAction, Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer, { RootReducerState } from 'reducers';

export const makeStore = () =>
  configureStore({
    reducer: reducer as Reducer<RootReducerState, AnyAction>,
  });

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });

const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
