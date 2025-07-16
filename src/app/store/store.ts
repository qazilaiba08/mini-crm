// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import crmReducer from '../actions/crmSlice.ts';

export const store = configureStore({
  reducer: crmReducer
  
});
export type RootState = ReturnType<typeof store.getState>;;
export type AppDispatch = typeof store.dispatch;
