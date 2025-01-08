import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "counter",
  initialState: { userData: null, token: "" },
  reducers: {
    onSignIn(state, action) {
      state.token = action.payload?.token;
      state.userData = action.payload?.user;
    },
  },
});

export const { onSignIn } = authSlice.actions;
export default authSlice.reducer;
