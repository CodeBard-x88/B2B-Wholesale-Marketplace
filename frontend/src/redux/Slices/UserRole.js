import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'seller',
};

export const UserRoleSlice = createSlice({
  name: 'userrole',
  initialState,
  reducers: {
    SetUserRole: (state, value) => {
        state.value = value;
    },
  },
});

export const { SetUserRole } = UserRoleSlice.actions

export default UserRoleSlice.reducer