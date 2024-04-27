import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import authReducer from "@/app/(auth)/_redux/auth.slice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistAuthConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistAuthConfig, authReducer),
  [apiSlice.reducerPath]: apiSlice.reducer,
  //   similarly other reducer goes here
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
