import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { userData: null, token: "", isAdmin: false },
  reducers: {
    onSignIn(state, action) {
      state.token = action.payload?.token;
      state.userData = action.payload?.user;
      console.log("action.payload?.user is =--> ", action.payload?.user);

      state.isAdmin = action.payload?.user?.role === "admin";
    },
    onProfilePicUpdate(state, action) {
      state.userData.avatar = action.payload;
    },
  },
});

export const { onSignIn, onProfilePicUpdate } = authSlice.actions;
export default authSlice.reducer;
