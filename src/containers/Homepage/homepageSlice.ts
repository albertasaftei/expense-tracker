import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddExpenseInputs, Category, Expense, FilterExpenses } from "./types";
import { BackendUrl, backendUrl } from "src/utils/appConfig";

export interface HomepageState {
    expenses: Expense[];
    expensesCurrentMonth: Expense[] | null;
    categories: Category[];
    isLoading?: boolean;
    error?: boolean;
}

const initialState: HomepageState = {
    expenses: [],
    expensesCurrentMonth: null,
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

export const postNewExpense = createAsyncThunk("postNewExpense", async (data: AddExpenseInputs) => {
    const response = await fetch(`${backendUrl[import.meta.env.VITE_NODE_ENV as keyof BackendUrl]}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error posting new expense");
        return [];
    }
});

export const fetchExpensesCurrentMonth = createAsyncThunk("fetchExpensesCurrentMonth", async () => {
    const response = await fetch(`${backendUrl[import.meta.env.VITE_NODE_ENV as keyof BackendUrl]}/expenses/currentMonth`);
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error fetching expenses for current month");
        return [];
    }
});

export const fetchFilteredExpenses = createAsyncThunk("fetchFilteredExpenses", async (data?: FilterExpenses) => {
    const response = await fetch(`${backendUrl[import.meta.env.VITE_NODE_ENV as keyof BackendUrl]}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error posting expenses");
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
            .addCase(fetchExpensesCurrentMonth.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchExpensesCurrentMonth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.expensesCurrentMonth = action.payload;
            })
            .addCase(fetchExpensesCurrentMonth.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchFilteredExpenses.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchFilteredExpenses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.expenses = action.payload;
            })
            .addCase(fetchFilteredExpenses.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            ;
    },
});

export default homepageSlice.reducer;
