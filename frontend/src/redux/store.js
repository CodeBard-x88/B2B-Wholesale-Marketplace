import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Slices/LoginSlice';
import  UserRoleReducer  from './Slices/UserRole';
import StoreReducer from './Slices/Store';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    userrole: UserRoleReducer,
    storeStatus: StoreReducer,
  },
});
