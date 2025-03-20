import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer, { RootState, RootAction } from "./reducers";

// ✅ Allow Redux Toolkit to infer store types
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// ✅ Persistor
export const persistor = persistStore(store);

// ✅ App Types
export type AppDispatch = typeof store.dispatch;

// ✅ AppThunk Type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    RootAction
>;
