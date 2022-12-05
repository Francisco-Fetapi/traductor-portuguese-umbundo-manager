import { RootState } from "./App.store";

export const selectTheme = (state: RootState) => state.app.darkMode;
export const selectShowItems = (state: RootState) => state.app.showItems;
