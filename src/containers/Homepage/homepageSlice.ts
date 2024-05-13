import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category, Expense } from "./types";
import { BackendUrl, backendUrl } from "src/utils/appConfig";

export interface HomepageState {
    expenses: Expense[];
    categories: Category[];
    isLoading?: boolean;
    error?: boolean;
}

const initialState: HomepageState = {
    expenses: [],
    categories: [],
    isLoading: false,
    error: false,
};

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
    const response = await fetch(`${backendUrl[import.meta.env.VITE_NODE_ENV as keyof BackendUrl]}/categories`);
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error fetching categories");
        return [];
    }
});

export const fetchExpenses = createAsyncThunk("fetchExpenses", async () => {
    const response = await fetch(`${backendUrl[import.meta.env.VITE_NODE_ENV as keyof BackendUrl]}/expenses`);
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error fetching expenses");
        return [];
    }
});

export const homepageSlice = createSlice({
    name: "homepage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.expenses = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            ;
    },
});

export default homepageSlice.reducer;
