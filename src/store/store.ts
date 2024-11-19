import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipes.slice";

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
