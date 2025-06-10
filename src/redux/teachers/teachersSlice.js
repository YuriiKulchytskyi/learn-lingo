import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachers } from "./teachersOperations";

const initialState = {
  teachers: [],
  error: null,
  isLoading: false,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teachers = action.payload;
        console.log(action.payload);
        
      });
  },
});


export const teachersReducer = teachersSlice.reducer
