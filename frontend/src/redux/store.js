import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Slices/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
