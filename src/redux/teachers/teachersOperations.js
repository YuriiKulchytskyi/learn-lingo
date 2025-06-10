import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://learn-lingo-5c782-default-rtdb.europe-west1.firebasedatabase.app/'



export const getAllTeachers = createAsyncThunk(
    'teachers/getAllTeachers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('')
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)