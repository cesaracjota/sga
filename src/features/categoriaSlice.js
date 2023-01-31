import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/categoria.service";

const initialState = {
    categorias: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new category

export const createCategory = createAsyncThunk(
    "category/create",
    async ( categoryData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoryService.createCategory(categoryData, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Get categories

export const getCategories = createAsyncThunk(
    "categorias/getCategories",
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAllCategories();
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Update category

export const updateCategories = createAsyncThunk(
    "category/update",
    async (categoryData, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoryService.updateCategory(categoryData, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Delete category

export const deleteCategory = createAsyncThunk(
    "categorias/deleteCategory",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await categoryService.deleteCategory(id, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const categoriaSlice = createSlice({
    name: "categorias",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categorias = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categorias.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categorias = state.categorias.filter((categoria) => 
                    categoria._id !== action.payload._id);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categorias = state.categorias.map((categoria) => 
                    categoria._id === action.payload._id ? action.payload : categoria);
            })
            .addCase(updateCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = categoriaSlice.actions;
export default categoriaSlice.reducer;