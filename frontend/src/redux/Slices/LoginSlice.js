import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: document.cookie.match(/(?:^|;\s*)token=([^;]*)/) ? true : false,
};

export const loginSlice = createSlice({
  name: 'loginStatus',
  initialState,
  reducers: {
    toggleLoginStatus: (state) => {
        state.value = !state.value;
    },
  },
});

export const { toggleLoginStatus } = loginSlice.actions

export default loginSlice.reducer