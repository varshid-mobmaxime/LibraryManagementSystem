import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { buttonColor: "#1890ff" },
  reducers: {
    onButtonColorUpdate(state, action) {
      state.buttonColor = action.payload;
    },
  },
});

export const { onButtonColorUpdate } = themeSlice.actions;
export default themeSlice.reducer;
