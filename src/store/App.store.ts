import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./App.actions";

export const THEME_KEY_IN_LOCALSTORAGE = "darkMode";

export interface IDarkMode {
  darkMode: boolean;
  showItems: number;
}
export interface App extends IDarkMode {}
export const ITEMS_PER_PAGE = 10;

export const initialState: App = {
  darkMode: false,
  showItems: ITEMS_PER_PAGE,
};

export function sliceCreator(initialState: App) {
  return createSlice({
    name: "app",
    initialState,
    reducers,
  });
}

export const app = sliceCreator(initialState);

export const middlewares = {
  serializableCheck: {
    // Ignore these paths in the state
    ignoredPaths: [],
  },
};

export const store = configureStore({
  reducer: {
    app: app.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewares),
});

export default store;

export const { toggleTheme, resetAllState, setTheme, showMoreItems } =
  app.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
