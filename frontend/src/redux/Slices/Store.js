import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
};

export const StoreStatus = createSlice({
  name: 'storeStatus',
  initialState,
  reducers: {
    SetStoreStatus: (state, value) => {
        state.value = value.payload;
    },
  },
});

export const { SetStoreStatus } = StoreStatus.actions

export default StoreStatus.reducer