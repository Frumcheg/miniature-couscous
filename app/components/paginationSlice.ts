import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

const initialState = { currentPage: 1, pageSize: 10 } as PaginationState;

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPagesCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPageSize, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;