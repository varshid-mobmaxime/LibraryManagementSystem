// import { configureStore } from '@reduxjs/toolkit'

// export const store = configureStore({
//   reducer: {
//     counter: counterSlice,
//   },
// })

import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const config = {
  key: "root",
  storage: storage,
  // whitelist: ['setting'],
  blacklist: ["loading"],
  debug: true, // to get useful logging
};
const reducers = persistReducer(config, rootReducers);

export const store = configureStore({
  reducer: reducers,
});
export const persistor = persistStore(store);

// const config = {
//   key: "root",
//   // storage: AsyncStorage,
//   // whitelist: ['setting'],
//   // blacklist: ['loading'],
//   debug: true, // to get useful logging
// };
// const reducers = rootReducers;

// export const store = configureStore({
//   reducer: reducers,
//   // middleware: [thunk],
// });
// export const persistor = persistStore(store);
