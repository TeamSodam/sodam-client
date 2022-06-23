import { selectUserToken, setToken } from 'features/users/userSlice';

import { AppDispatch, subscribeState } from './store';

const TOKEN_NAME = 'sodam-at';

export const subscribeToken = () => {
  const unSubscribe = subscribeState<ReturnType<typeof selectUserToken>>(
    selectUserToken,
    (token: ReturnType<typeof selectUserToken>, dispatch: AppDispatch) => {
      if (typeof window === 'undefined') return;
      const ls = window.localStorage;
      const persistedToken = ls.getItem(TOKEN_NAME);

      if (!token && persistedToken) dispatch(setToken(persistedToken));
      else if (token && token !== persistedToken) ls.setItem(TOKEN_NAME, token);
    },
    () => {
      if (typeof window === 'undefined') return;
      const ls = window.localStorage;

      ls.removeItem(TOKEN_NAME);
      unSubscribe();
    },
  );
};
