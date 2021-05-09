import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "../resources/productSlice";

export const reducer = {
    products: productsReducer,
};

export const store = configureStore({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
