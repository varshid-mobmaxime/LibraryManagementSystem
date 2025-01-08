import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counterValue: 0 },
  reducers: {
    Add(state) {
      state.counterValue = state.counterValue + 1;
    },
    Sub(state) {
      state.counterValue = state.counterValue - 1;
    },
  },
});

export const { Add, Sub } = counterSlice.actions;
export default counterSlice.reducer;
