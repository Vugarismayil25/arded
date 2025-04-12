import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apis from "./services";
import CursorReducer from "./slice/CursorSlice";

const persistConfig = {
  key: "cursor",
  storage,
};

const persistedCursorReducer = persistReducer(persistConfig, CursorReducer);

const reducers = { cursor: persistedCursorReducer };

const middlewares = [];

apis.forEach((api) => {
  reducers[api.reducerPath] = api.reducer;
  middlewares.push(api.middleware);
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
