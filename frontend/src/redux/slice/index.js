import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice";
import authSlice from "../slice/authSlice";
import { LOGOUT } from "../actionTypes";

const reducers = combineReducers({
  counter: counterSlice,
  auth: authSlice,
});

// Exports
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
};
export default rootReducer;
