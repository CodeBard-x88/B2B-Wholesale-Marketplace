import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
};

export const loginSlice = createSlice({
  name: 'loginStatus',
  initialState, // Correct key
  reducers: {
    toggleLoginStatus: (state) => {
        state.value = !state.value;
    },
  },
});


// Action creators are generated for each case reducer function
export const { toggleLoginStatus } = loginSlice.actions

export default loginSlice.reducer