import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import filter from './filter/slice';
import { githubApi } from './github';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    filter
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
