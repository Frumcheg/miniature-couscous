import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { apiOfIceAndFire } from "./apiService";
import paginationReducer from "./components/paginationSlice";

const store = configureStore({
  reducer: {
    [apiOfIceAndFire.reducerPath]: apiOfIceAndFire.reducer,
    pagination: paginationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiOfIceAndFire.middleware),
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;