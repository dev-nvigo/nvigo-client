"use client"; // If you're importing store in a client component

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./slices";

// 1. Combine all your reducers
const rootReducer = combineReducers({
  user: userReducer,
  // add more slices as needed
});

// 2. Configure redux-persist
const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["user"], // or blacklist if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // middleware, devTools, etc. can be customized here
});

export const persistor = persistStore(store);

// 4. Infer types for usage in custom hooks (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
